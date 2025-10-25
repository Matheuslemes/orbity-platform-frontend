import { NextResponse } from "next/server"
import { apiRequest, HttpError } from "@/lib/http/client"

function isMock() {
  return process.env.NEXT_PUBLIC_API_MODE?.toLowerCase() === "mock" || process.env.MOCK === "true"
}

export async function GET() {
  // MOCK opcional para dev
  if (isMock()) {
    return NextResponse.json(
      { items: [], total: 0, currency: "BRL", updatedAt: new Date().toISOString() },
      { status: 200 }
    )
  }

  try {
    // GARANTA que env.apiGatewayUrl tem protocolo (http/https) e está correto
    const data = await apiRequest<{ items: any[]; total: number; currency: string }>("/cart", {
      // se o gateway exigir auth/cookie e você quiser repassar algo extra, acrescente em headers:
      // headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
      method: "GET",
    })
    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    if (e instanceof HttpError) {
      // Loga o upstream e retorna código/erro consistentes
      console.error("[cart] upstream error:", e.status, e.code, e.message)
      return NextResponse.json({ code: e.code, message: e.message, details: e.details }, { status: e.status })
    }
    console.error("[cart] unknown error:", e)
    return NextResponse.json({ code: "UNKNOWN", message: "Unknown error" }, { status: 500 })
  }
}
