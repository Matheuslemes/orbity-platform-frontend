"use client"

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"

export default function CancelOrderButton({ id }: { id: string }) {
  const router = useRouter()
  const [isPending, start] = useTransition()
  const [busy, setBusy] = useState(false)
  const loading = isPending || busy

  return (
    <button
      type="button"
      className="px-3 py-2 rounded-md border hover:bg-muted transition text-sm disabled:opacity-60"
      disabled={loading}
      onClick={() =>
        start(async () => {
          if (!confirm("Deseja cancelar este pedido?")) return
          try {
            setBusy(true)
            const res = await fetch(`/api/orders/${id}/cancel`, { method: "POST" })
            if (!res.ok) {
              const { status } = res
              if (status === 401) alert("Você precisa estar autenticado para cancelar um pedido.")
              else alert("Falha ao cancelar o pedido.")
              return
            }
            router.refresh()
          } finally {
            setBusy(false)
          }
        })
      }
    >
      {loading ? "Cancelando..." : "Cancelar pedido"}
    </button>
  )
}
