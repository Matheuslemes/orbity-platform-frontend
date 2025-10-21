import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { mockOrders } from "@/lib/mock-datas"

function resolveDataMode(): "mock" | "api" {
  const dm = process.env.DATA_MODE?.toLowerCase()
  return dm === "api" ? "api" : "mock"
}

async function cancelOrderInApi(id: string, bearer?: string) {
  const base = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL
  if (!base) throw new Error("API_GATEWAY_URL not set")
  const url = new URL(`/orders/${encodeURIComponent(id)}/cancel`, base)
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
    },
  })
  if (!res.ok) throw new Error(`order cancel failed: ${res.status}`)
  return res.json()
}

export async function POST(_req: Request, ctx: { params: { id: string } }) {
  try {
    const session = await getSession()
    const mode = resolveDataMode()
    const id = ctx.params.id

    if (!session && mode === "api") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Not authenticated" }, { status: 401 })
    }

    if (mode === "api") {
      const data = await cancelOrderInApi(id, session!.accessToken)
      return NextResponse.json(data)
    }

    // mock: valida e retorna ok
    const exists = mockOrders.some((o) => o.id === id)
    if (!exists) {
      return NextResponse.json({ code: "ORDER_NOT_FOUND", message: "Pedido não encontrado" }, { status: 404 })
    }
    return NextResponse.json({ ok: true, id, status: "canceled (mock)" })
  } catch (error) {
    console.error("[orders/:id/cancel] POST error:", error)
    return NextResponse.json({ code: "ORDER_CANCEL_ERROR", message: "Falha ao cancelar pedido" }, { status: 500 })
  }
}
