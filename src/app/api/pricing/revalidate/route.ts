import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { PriceSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sku = searchParams.get("sku")

    if (!sku) {
      return NextResponse.json({ code: "MISSING_SKU", message: "SKU is required" }, { status: 400 })
    }

    // Call API Gateway - no cache for pricing
    const data = await apiRequest(`/pricing/revalidate?sku=${sku}`)

    // Validate response
    const validated = PriceSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Revalidate price error:", error)

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "REVALIDATE_PRICE_ERROR", message: "Failed to revalidate price" }, { status: 500 })
  }
}
