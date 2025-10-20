import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { AddressSchema } from "@/lib/schemas/api"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const AddressesSchema = z.array(AddressSchema)

const CreateAddressSchema = z.object({
  name: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string().optional(),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  postalCode: z.string().min(8).max(9),
  country: z.string().default("BR"),
})

export async function GET() {
  try {
    const session = await requireAuth()

    // Call API Gateway with auth token
    const data = await apiRequest("/customer/addresses", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    // Validate response
    const validated = AddressesSchema.parse(data)

    return NextResponse.json(validated, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Get addresses error:", error)

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Authentication required" }, { status: 401 })
    }

    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number; code: string; message: string }
      return NextResponse.json({ code: httpError.code, message: httpError.message }, { status: httpError.status })
    }

    return NextResponse.json({ code: "GET_ADDRESSES_ERROR", message: "Failed to get addresses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Parse request body
    const body = await request.json()
    const validated = CreateAddressSchema.parse(body)

    // Call API Gateway with auth token
    const data = await apiRequest("/customer/addresses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
    })

    // Validate response
    const address = AddressSchema.parse(data)

    return NextResponse.json(address, {
      status: 201,
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Create address error:", error)

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

    return NextResponse.json({ code: "CREATE_ADDRESS_ERROR", message: "Failed to create address" }, { status: 500 })
  }
}
