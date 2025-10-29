"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export function ReturnRequestForm() {
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true); setOk(null); setErr(null)

    // MOCK: simula envio; troque por POST /api/returns
    try {
      await new Promise((r) => setTimeout(r, 900))
      setOk("Solicitação registrada! Você receberá instruções por e-mail em instantes.")
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (error: any) {
      setErr(error?.message ?? "Não foi possível registrar sua solicitação.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Número do pedido</label>
          <Input name="orderId" placeholder="Ex.: 123456" required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">E-mail ou CPF</label>
          <Input name="identity" placeholder="voce@exemplo.com ou 000.000.000-00" required />
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Motivo</label>
          <select name="reason" className="h-9 rounded-md border bg-background px-3 text-sm" required defaultValue="">
            <option value="" disabled>Selecione…</option>
            <option value="arrependimento">Arrependimento</option>
            <option value="defeito">Defeito / não funciona</option>
            <option value="avaria">Avaria no transporte</option>
            <option value="item-errado">Item incorreto</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Preferência de solução</label>
          <select name="solution" className="h-9 rounded-md border bg-background px-3 text-sm" required defaultValue="reembolso">
            <option value="reembolso">Reembolso</option>
            <option value="troca">Troca pelo mesmo produto</option>
            <option value="credito">Crédito para nova compra</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Condição do produto</label>
        <div className="grid gap-2 md:grid-cols-3">
          <label className="flex items-center gap-2 text-sm"><input type="radio" name="condition" value="lacrado" required /> Lacrado</label>
          <label className="flex items-center gap-2 text-sm"><input type="radio" name="condition" value="aberto" /> Aberto, sem uso</label>
          <label className="flex items-center gap-2 text-sm"><input type="radio" name="condition" value="usado" /> Com uso / sinais de uso</label>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Observações (opcional)</label>
        <Textarea name="notes" placeholder="Descreva detalhes, número de série, fotos anexadas, etc." />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>{busy ? "Enviando…" : "Solicitar devolução"}</Button>
        <p className="text-xs text-muted-foreground">
          Ao enviar, você concorda com os{" "}
          <Link href="/company/terms" className="underline">Termos de Uso</Link>.
        </p>
      </div>

      {ok && <p className="text-sm text-green-600">{ok}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </form>
  )
}
