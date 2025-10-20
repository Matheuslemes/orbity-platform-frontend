import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CartSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const ApplyCouponSchema = z.object({
  code: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Parse request body
    const body = await request.json()
    const validated = ApplyCouponSchema.parse(body)

    // Call API Gateway with auth token
    const data = await apiRequest("/cart/coupon", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
    })

    // Validate response
    const cart = CartSchema.parse(data)

    return NextResponse.json(cart, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Apply coupon error:", error)

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

    return NextResponse.json({ code: "APPLY_COUPON_ERROR", message: "Failed to apply coupon" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Call API Gateway with auth token
    const data = await apiRequest("/cart/coupon", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const cart = CartSchema.parse(data)

    return NextResponse.json(cart, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Remove coupon error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "REMOVE_COUPON_ERROR", message: "Failed to remove coupon" }, { status: 500 })
  }
}
