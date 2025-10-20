import { NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CacheControl } from "@/lib/http/cache"
import { z } from "zod"

const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
})

const BrandsSchema = z.array(BrandSchema)

export async function GET() {
  try {
    // Call API Gateway
    const data = await apiRequest("/catalog/brands")

    // Validate response
    const validated = BrandsSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.public(),
    })
  } catch (error) {
    console.error("[v0] Get brands error:", error)

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "GET_BRANDS_ERROR", message: "Failed to get brands" }, { status: 500 })
  }
}
