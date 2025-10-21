import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { CacheControl } from "@/lib/http/cache"
import { mockOrders } from "@/lib/mock-datas"

function resolveDataMode(): "mock" | "api" {
  const dm = process.env.DATA_MODE?.toLowerCase()
  return dm === "api" ? "api" : "mock"
}

async function fetchOrdersFromApi(userId: string, bearer?: string) {
  const base = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL
  if (!base) throw new Error("API_GATEWAY_URL not set")

  const url = new URL(`/orders?customerId=${encodeURIComponent(userId)}`, base)
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
    },
    next: { revalidate: 30 },
  })
  if (!res.ok) throw new Error(`orders list failed: ${res.status}`)
  return res.json()
}

export async function GET() {
  try {
    const session = await getSession()
    const mode = resolveDataMode()

    if (!session && mode === "api") {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Not authenticated" }, { status: 401 })
    }

    const data =
      mode === "api"
        ? await fetchOrdersFromApi(session!.id, session!.accessToken)
        : mockOrders

    return NextResponse.json(data, { headers: CacheControl.private() })
  } catch (error) {
    console.error("[orders] GET error:", error)
    return NextResponse.json({ code: "ORDERS_ERROR", message: "Falha ao obter pedidos" }, { status: 500 })
  }
}
