import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CustomerSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const UpdateCustomerSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  cpf: z.string().optional(),
})

export async function GET() {
  try {
    const session = await requireAuth()

    // Call API Gateway with auth token
    const data = await apiRequest("/customer/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const validated = CustomerSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Get customer profile error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "GET_CUSTOMER_ERROR", message: "Failed to get customer profile" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Parse request body
    const body = await request.json()
    const validated = UpdateCustomerSchema.parse(body)

    // Call API Gateway with auth token
    const data = await apiRequest("/customer/me", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
    })

    // Validate response
    const customer = CustomerSchema.parse(data)

    return NextResponse.json(customer, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Update customer profile error:", error)

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

    return NextResponse.json(
      { code: "UPDATE_CUSTOMER_ERROR", message: "Failed to update customer profile" },
      { status: 500 },
    )
  }
}
