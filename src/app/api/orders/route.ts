import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { OrderSchema, OrderListSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const CreateOrderSchema = z.object({
  checkoutId: z.string(),
  addressId: z.string(),
  shippingOptionId: z.string(),
  paymentIntentId: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth()
    const searchParams = request.nextUrl.searchParams

    // Build query string
    const params = new URLSearchParams()

    const page = searchParams.get("page") || "1"
    const pageSize = searchParams.get("pageSize") || "10"
    params.set("page", page)
    params.set("pageSize", pageSize)

    const status = searchParams.get("status")
    if (status) params.set("status", status)

    const period = searchParams.get("period")
    if (period) params.set("period", period)

    // Call API Gateway with auth token
    const data = await apiRequest(`/orders?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const validated = OrderListSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Get orders error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "GET_ORDERS_ERROR", message: "Failed to get orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Parse request body
    const body = await request.json()
    const validated = CreateOrderSchema.parse(body)

    // Generate idempotency key for order creation
    const idempotencyKey = crypto.randomUUID()

    // Call API Gateway with auth token and idempotency key
    const data = await apiRequest("/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
      idempotencyKey,
    })

    // Validate response
    const order = OrderSchema.parse(data)

    return NextResponse.json(order, {
      status: 201,
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Create order error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { code: "VALIDATION_ERROR", message: "Invalid request data", details: error.errors },
        { status: 400 },
      )
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "CREATE_ORDER_ERROR", message: "Failed to create order" }, { status: 500 })
  }
}
