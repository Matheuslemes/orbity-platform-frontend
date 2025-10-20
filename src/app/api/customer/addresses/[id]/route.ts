import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { AddressSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const UpdateAddressSchema = z.object({
  name: z.string().min(1).optional(),
  street: z.string().min(1).optional(),
  number: z.string().min(1).optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(2).max(2).optional(),
  postalCode: z.string().min(8).max(9).optional(),
})

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAuth()
    const { id } = await params

    // Call API Gateway with auth token
    const data = await apiRequest(`/customer/addresses/${id}`, {
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
    console.error("[v0] Get address error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "GET_ADDRESS_ERROR", message: "Failed to get address" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAuth()
    const { id } = await params

    // Parse request body
    const body = await request.json()
    const validated = UpdateAddressSchema.parse(body)

    // Call API Gateway with auth token
    const data = await apiRequest(`/customer/addresses/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
    })

    // Validate response
    const address = AddressSchema.parse(data)

    return NextResponse.json(address, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Update address error:", error)

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

    return NextResponse.json({ code: "UPDATE_ADDRESS_ERROR", message: "Failed to update address" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAuth()
    const { id } = await params

    // Call API Gateway with auth token
    await apiRequest(`/customer/addresses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    return new NextResponse(null, {
      status: 204,
    })
  } catch (error) {
    console.error("[v0] Delete address error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "DELETE_ADDRESS_ERROR", message: "Failed to delete address" }, { status: 500 })
  }
}
