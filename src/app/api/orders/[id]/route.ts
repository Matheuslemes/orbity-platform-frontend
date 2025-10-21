import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { CacheControl } from "@/lib/http/cache"
import { mockOrders } from "@/lib/mock-datas"

function resolveDataMode(): "mock" | "api" {
  const dm = process.env.DATA_MODE?.toLowerCase()
  return dm === "api" ? "api" : "mock"
}

async function fetchOrderFromApi(id: string, bearer?: string) {
  const base = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL
  if (!base) throw new Error("API_GATEWAY_URL not set")
  const url = new URL(`/orders/${encodeURIComponent(id)}`, base)
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
    },
    next: { revalidate: 15 },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`order get failed: ${res.status}`)
  return res.json()
}

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  try {
    const session = await getSession()
    const mode = resolveDataMode()
    const id = ctx.params.id

    if (!session && mode === "api") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Not authenticated" }, { status: 401 })
    }

    const data =
      mode === "api"
        ? await fetchOrderFromApi(id, session!.accessToken)
        : mockOrders.find((o) => o.id === id) ?? null

    if (!data) {
      return NextResponse.json({ code: "ORDER_NOT_FOUND", message: "Pedido não encontrado" }, { status: 404 })
    }

    return NextResponse.json(data, { headers: CacheControl.private() })
  } catch (error) {
    console.error("[orders/:id] GET error:", error)
    return NextResponse.json({ code: "ORDER_ERROR", message: "Falha ao obter pedido" }, { status: 500 })
  }
}
