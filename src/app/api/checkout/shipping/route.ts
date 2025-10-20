import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const ShippingOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  estimatedDays: z.number(),
  carrier: z.string().optional(),
})

const ShippingOptionsSchema = z.array(ShippingOptionSchema)

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth()
    const searchParams = request.nextUrl.searchParams
    const postalCode = searchParams.get("postalCode")

    if (!postalCode) {
      return NextResponse.json({ code: "MISSING_POSTAL_CODE", message: "Postal code is required" }, { status: 400 })
    }

    // Call API Gateway with auth token
    const data = await apiRequest(`/checkout/shipping?postalCode=${postalCode}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const validated = ShippingOptionsSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Get shipping options error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json(
      { code: "GET_SHIPPING_OPTIONS_ERROR", message: "Failed to get shipping options" },
      { status: 500 },
    )
  }
}
