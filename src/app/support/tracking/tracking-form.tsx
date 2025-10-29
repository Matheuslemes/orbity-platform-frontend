// src/app/support/tracking/tracking-form.tsx
"use client"

import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator" // <- manter este
import { CheckCircle2, Circle, Clock, Truck, PackageOpen, Home } from "lucide-react"

type TrackingStep = {
  code: "placed" | "paid" | "packed" | "shipped" | "out_for_delivery" | "delivered"
  title: string
  description: string
  at?: string // ISO
}

type TrackingData = {
  orderId: string
  carrier?: string
  trackingCode?: string
  estimatedDelivery?: string
  steps: TrackingStep[]
}

export function TrackingForm() {
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState<TrackingData | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true); setOk(null); setErr(null)
    const fd = new FormData(e.currentTarget)
    const orderId = String(fd.get("orderId") || "").trim()
    const identity = String(fd.get("identity") || "").trim()

    if (!orderId || !identity) {
      setErr("Preencha número do pedido e e-mail/CPF."); setBusy(false); return
    }

    try {
      await new Promise((r) => setTimeout(r, 900)) // MOCK
      const mock = buildMockTracking(orderId)
      setOk(mock)
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao consultar rastreamento.")
    } finally {
      setBusy(false)
    }
  }

  const resultContainer = typeof window !== "undefined" ? document.getElementById("tracking-result") : null

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Número do pedido</label>
          <Input name="orderId" placeholder="Ex.: 123456" required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">E-mail ou CPF</label>
          <Input name="identity" placeholder="voce@exemplo.com ou 000.000.000-00" required />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={busy}>{busy ? "Consultando…" : "Rastrear pedido"}</Button>
          {err && <span className="text-xs text-red-600">{err}</span>}
        </div>
      </form>

      {/* Render do resultado no card ao lado */}
      {resultContainer && createPortal(
        ok ? <TrackingResult data={ok} /> : null,
        resultContainer
      )}
    </>
  )
}

/* ---------------------- */
/* Resultado / Timeline   */
/* ---------------------- */

function TrackingResult({ data }: { data: TrackingData }) {
  const statusIcon = useMemo(() => ({
    placed:            <Circle className="h-4 w-4" />,
    paid:              <Clock className="h-4 w-4" />,
    packed:            <PackageOpen className="h-4 w-4" />,
    shipped:           <Truck className="h-4 w-4" />,
    out_for_delivery:  <Truck className="h-4 w-4" />,
    delivered:         <Home className="h-4 w-4" />,
  }), [])

  const humanDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleString("pt-BR") : "—"

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Pedido</div>
          <div className="font-medium">{data.orderId}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Transportadora</div>
          <div className="font-medium">{data.carrier ?? "—"}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Código de rastreio</div>
          <div className="font-medium">{data.trackingCode ?? "—"}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Previsão de entrega</div>
          <div className="font-medium">
            {data.estimatedDelivery ? new Date(data.estimatedDelivery).toLocaleDateString("pt-BR") : "—"}
          </div>
        </div>
      </div>

      {/* Usa o Separator do shadcn/ui (importado) */}
      <Separator />

      <ul className="space-y-4">
        {data.steps.map((s, i) => {
          const deliveredIdx = data.steps.findIndex(st => st.code === "delivered")
          const done = deliveredIdx >= 0 ? i <= deliveredIdx : i < data.steps.length - 1
          return (
            <li key={s.code} className="flex items-start gap-3">
              <div className={`mt-0.5 rounded-full ${done ? "text-green-600" : "text-muted-foreground"}`}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : statusIcon[s.code]}
              </div>
              <div className="space-y-0.5">
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.description}</div>
                <div className="text-xs text-muted-foreground">{humanDate(s.at)}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------------------- */
/* Mock de rastreamento   */
/* ---------------------- */
function buildMockTracking(orderId: string): TrackingData {
  const now = Date.now()
  const d = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000).toISOString()
  const eta = new Date(now + 2 * 24 * 60 * 60 * 1000).toISOString()

  return {
    orderId,
    carrier: "Orbity Logistics",
    trackingCode: `ORBY-${orderId.slice(-6).padStart(6, "0")}`,
    estimatedDelivery: eta,
    steps: [
      { code: "placed",  title: "Pedido recebido",        description: "Recebemos seu pedido e estamos processando.", at: d(5) },
      { code: "paid",    title: "Pagamento aprovado",     description: "Pagamento confirmado pela operadora.",        at: d(5) },
      { code: "packed",  title: "Produto embalado",       description: "Seu item foi separado e embalado.",          at: d(3) },
      { code: "shipped", title: "Pedido despachado",      description: "Saiu do centro de distribuição.",            at: d(2) },
      { code: "out_for_delivery", title: "Saiu para entrega", description: "O entregador está a caminho.",          at: d(0.3) },
      // { code: "delivered", title: "Entregue", description: "Pedido entregue ao destinatário.", at: d(0.1) },
    ],
  }
}
