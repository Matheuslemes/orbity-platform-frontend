import Link from "next/link"
import CancelOrderButton from "@/components/cancel-button" // botão client

//  Tipos (compatível com mock e API) 
type OrderStatus = "confirmed" | "processing" | "shipped" | "delivered" | "canceled"

type Order = {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: {
    product: { name: string; slug?: string; image?: string }
    quantity: number
    price: number
  }[]
  shipping?: {
    carrier: string
    tracking?: string
    eta?: string
    address: { street: string; city: string; state: string; zip: string }
  }
  payment?: { method: string; last4?: string }
  timeline?: { status: string; date: string; completed: boolean }[]
}

//  Fallback mock (render mesmo com 401 da API) 
const FALLBACK_ORDERS: Order[] = [
  {
    id: "ORB-2025-001234",
    date: "2025-01-08T14:30:00Z",
    status: "shipped",
    total: 7499.9,
    items: [
      {
        product: {
          name: 'Creator Pro 14" - Laptop Premium para Criadores',
          slug: "laptop-creator-pro-14",
          image: "/modern-laptop-with-sleek-design.jpg",
        },
        quantity: 1,
        price: 7499.9,
      },
    ],
    shipping: {
      carrier: "Correios (SEDEX)",
      tracking: "BR123456789BR",
      eta: "2025-01-12",
      address: { street: "Rua das Estrelas, 123", city: "São Paulo", state: "SP", zip: "01234-567" },
    },
    payment: { method: "Cartão de Crédito", last4: "4242" },
    timeline: [
      { status: "Pedido confirmado", date: "2025-01-08 14:30", completed: true },
      { status: "Em separação", date: "2025-01-08 16:45", completed: true },
      { status: "Enviado", date: "2025-01-09 09:20", completed: true },
      { status: "Em trânsito", date: "2025-01-09 14:00", completed: true },
      { status: "Saiu para entrega", date: "", completed: false },
      { status: "Entregue", date: "", completed: false },
    ],
  },
  {
    id: "ORB-2025-001198",
    date: "2025-01-05T10:10:00Z",
    status: "delivered",
    total: 3649.7,
    items: [
      {
        product: {
          name: "Teclado Mecânico RGB - Switch Tátil",
          slug: "mechanical-keyboard-rgb",
          image: "/mechanical-keyboard-with-rgb-backlight.jpg",
        },
        quantity: 1,
        price: 699.9,
      },
      {
        product: {
          name: "Mouse Wireless Pro - Sensor 26K DPI",
          slug: "wireless-mouse-pro",
          image: "/wireless-gaming-mouse-black.jpg",
        },
        quantity: 1,
        price: 449.9,
      },
      {
        product: {
          name: 'Monitor 4K 27" 144Hz - Gaming & Criação',
          slug: "monitor-4k-27-144hz",
          image: "/4k-gaming-monitor-with-thin-bezels.jpg",
        },
        quantity: 1,
        price: 2499.9,
      },
    ],
    shipping: {
      carrier: "Loggi",
      tracking: "LG-9044-88-1",
      eta: "2025-01-06",
      address: { street: "Av. Andrômeda, 987", city: "Barueri", state: "SP", zip: "06473-000" },
    },
    payment: { method: "Pix" },
    timeline: [
      { status: "Pedido confirmado", date: "2025-01-05 10:10", completed: true },
      { status: "Em separação", date: "2025-01-05 11:00", completed: true },
      { status: "Enviado", date: "2025-01-05 15:20", completed: true },
      { status: "Entregue", date: "2025-01-06 12:43", completed: true },
    ],
  },
]

// ---------------- Fetch com fallback ----------------
async function getOrders(): Promise<Order[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? ""
    const res = await fetch(`${base}/api/orders`, { cache: "no-store" })
    if (!res.ok) throw new Error("not ok")
    return (await res.json()) as Order[]
  } catch {
    return FALLBACK_ORDERS
  }
}

// ---------------- UI helpers ----------------
function currency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const map: Record<OrderStatus, string> = {
    confirmed: "bg-blue-500/15 text-blue-300 border-blue-400/30",
    processing: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    shipped: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    canceled: "bg-rose-500/15 text-rose-300 border-rose-400/30",
  }
  return <span className={`inline-flex px-2 py-1 rounded-md border text-xs capitalize ${map[status]}`}>{status}</span>
}

// aparece para tudo que NÃO for entregue nem cancelado
function canCancel(status: OrderStatus) {
  return status !== "delivered" && status !== "canceled"
}

export const metadata = { title: "Meus Pedidos - Orbity" }

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <section className="space-y-6">
      {orders.length === 0 && (
        <div className="rounded-xl border p-6 text-center text-muted-foreground">Você ainda não possui pedidos.</div>
      )}

      {orders.map((o) => (
        <div key={o.id} className="rounded-xl border p-5 md:p-6 bg-card">
          {/* header do pedido */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm text-muted-foreground">Pedido</div>
              <div className="font-semibold">{o.id}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Data</div>
              <div>{new Date(o.date).toLocaleString("pt-BR")}</div>
            </div>

            {/* Status + Cancelar (quando possível) */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-sm text-muted-foreground">Status</div>
              <StatusBadge status={o.status} />
              {canCancel(o.status) && <CancelOrderButton id={o.id} />}
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="font-semibold">{currency(o.total)}</div>
            </div>
          </div>

          {/* itens */}
          <div className="mt-4 border-t pt-4 space-y-3">
            {o.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate">
                    {it.product.slug ? (
                      <Link href={`/p/${it.product.slug}`} className="hover:underline">
                        {it.product.name}
                      </Link>
                    ) : (
                      it.product.name
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Qtd: {it.quantity} · Preço unit.: {currency(it.price)}
                  </div>
                </div>
                <div className="text-sm font-medium">{currency(it.price * it.quantity)}</div>
              </div>
            ))}
          </div>

          {/* shipping + pagamento */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground mb-1">Envio</div>
              <div className="text-sm">
                {o.shipping?.carrier || "—"}{" "}
                {o.shipping?.tracking ? (
                  <span className="text-muted-foreground">· Código: {o.shipping.tracking}</span>
                ) : null}
              </div>
              {o.shipping?.eta && (
                <div className="text-xs text-muted-foreground">
                  Previsão: {new Date(o.shipping.eta).toLocaleDateString("pt-BR")}
                </div>
              )}
              {o.shipping?.address && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {o.shipping.address.street}, {o.shipping.address.city} - {o.shipping.address.state} ·{" "}
                  {o.shipping.address.zip}
                </div>
              )}
            </div>

            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground mb-1">Pagamento</div>
              <div className="text-sm">
                {o.payment?.method || "—"}{" "}
                {o.payment?.last4 ? <span className="text-muted-foreground">· **** {o.payment.last4}</span> : null}
              </div>
            </div>
          </div>

          {/* ações secundárias (rodapé) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {o.shipping?.tracking && (
              <a
                href={`https://rastreamento.correios.com.br/app/index.php`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-md border hover:bg-muted transition text-sm"
              >
                Rastreamento
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
