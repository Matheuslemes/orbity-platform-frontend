import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { AddressSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAuth()
    const { id } = await params

    // Call API Gateway with auth token
    const data = await apiRequest(`/customer/addresses/${id}/default`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const validated = AddressSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Set default address error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json(
      { code: "SET_DEFAULT_ADDRESS_ERROR", message: "Failed to set default address" },
      { status: 500 },
    )
  }
}
