"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true); setOk(null); setErr(null)

    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") || "").trim()
    const email = String(fd.get("email") || "").trim()
    const subject = String(fd.get("subject") || "").trim()
    const message = String(fd.get("message") || "").trim()

    if (!name || !email || !message) {
      setErr("Preencha nome, e-mail e mensagem.")
      setBusy(false)
      return
    }

    try {
      // MOCK: substitua por POST /api/contact
      await new Promise((r) => setTimeout(r, 900))
      setOk("Mensagem enviada! Responderemos no seu e-mail.")
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (error: any) {
      setErr(error?.message ?? "Não foi possível enviar sua mensagem.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Nome</label>
          <Input id="name" name="name" placeholder="Seu nome" required />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">E-mail</label>
          <Input id="email" name="email" type="email" placeholder="voce@exemplo.com" required />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
        <Input id="subject" name="subject" placeholder="Ex.: Dúvida sobre pedido #123456" />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
        <Textarea id="message" name="message" placeholder="Explique como podemos ajudar…" required rows={6} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>{busy ? "Enviando…" : "Enviar mensagem"}</Button>
        {err && <span className="text-xs text-red-600">{err}</span>}
        {ok && <span className="text-xs text-green-600">{ok}</span>}
      </div>
    </form>
  )
}
