import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CartSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const AddItemSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  qty: z.number().int().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Parse request body
    const body = await request.json()
    const validated = AddItemSchema.parse(body)

    // Generate idempotency key
    const idempotencyKey = crypto.randomUUID()

    // Call API Gateway with auth token and idempotency key
    const data = await apiRequest("/cart/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
      idempotencyKey,
    })

    // Validate response
    const cart = CartSchema.parse(data)

    return NextResponse.json(cart, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Add to cart error:", error)

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

    return NextResponse.json({ code: "ADD_TO_CART_ERROR", message: "Failed to add item to cart" }, { status: 500 })
  }
}
