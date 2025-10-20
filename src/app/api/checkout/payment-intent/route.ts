import { type NextRequest, NextResponse } from "next/server"
import { apiRequest } from "@/lib/http/client"
import { CacheControl } from "@/lib/http/cache"
import { requireAuth } from "@/lib/auth/session"
import { z } from "zod"

const CreatePaymentIntentSchema = z.object({
  paymentMethod: z.enum(["credit_card", "debit_card", "pix", "boleto"]),
  installments: z.number().int().positive().optional(),
})

const PaymentIntentSchema = z.object({
  intentId: z.string(),
  clientSecret: z.string().optional(),
  pixCode: z.string().optional(),
  boletoUrl: z.string().optional(),
  expiresAt: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    // Parse request body
    const body = await request.json()
    const validated = CreatePaymentIntentSchema.parse(body)

    // Call API Gateway with auth token
    const data = await apiRequest("/checkout/payment-intent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(validated),
    })

    // Validate response
    const intent = PaymentIntentSchema.parse(data)

    return NextResponse.json(intent, {
      headers: CacheControl.private(),
    })
  } catch (error) {
    console.error("[v0] Create payment intent error:", error)

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
      { code: "CREATE_PAYMENT_INTENT_ERROR", message: "Failed to create payment intent" },
      { status: 500 },
    )
  }
}
