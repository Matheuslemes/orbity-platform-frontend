import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const CheckoutSessionSchema = z.object({
  checkoutId: z.string(),
  expiresAt: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Call API Gateway with auth token
    const data = await apiRequest("/checkout/start", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const validated = CheckoutSessionSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Start checkout error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "START_CHECKOUT_ERROR", message: "Failed to start checkout" }, { status: 500 })
  }
}
