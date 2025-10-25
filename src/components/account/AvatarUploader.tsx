"use client"

import * as React from "react"
import { useEffect, useState } from "react"

type Props = {
  initialUrl?: string
}

export function AvatarUploader({ initialUrl }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | undefined>(initialUrl)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  // Mantém o preview sincronizado se a URL inicial mudar (ex.: /api/me carregou depois)
  useEffect(() => {
    if (!file) setPreview(initialUrl)
  }, [initialUrl, file])

  function onPick(f?: File) {
    if (!f) return
    if (f.size > 5 * 1024 * 1024) {
      setMsg("Arquivo muito grande. Máximo 5MB.")
      return
    }
    setFile(f)
    setMsg(null)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    if (!file) {
      setMsg("Escolha uma imagem primeiro.")
      return
    }
    setBusy(true)
    try {
      const form = new FormData()
      form.append("avatar", file)

      const res = await fetch("/api/me/avatar", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Falha ao enviar imagem")

      if (data.url) {
        // cache-busting para refletir imediatamente
        const bust = `${data.url}${data.url.includes("?") ? "&" : "?"}t=${Date.now()}`
        setPreview(bust)
      }
      setMsg("Foto atualizada com sucesso!")
      setFile(null)
    } catch (err: any) {
      setMsg(err?.message || "Erro ao atualizar foto")
    } finally {
      setBusy(false)
    }
  }

  const FALLBACK = "/placeholder-user.jpg"
  const effective = preview || initialUrl || FALLBACK

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Área fixa do preview (aparece exatamente no quadrado destacado) */}
        <div className="relative h-28 w-28 overflow-hidden rounded-lg border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={effective}
            alt="Avatar"
            className="h-full w-full object-cover"
            onError={(e) => {
              const img = e.currentTarget
              if (!img.src.endsWith(FALLBACK)) img.src = FALLBACK
            }}
            loading="lazy"
          />
        </div>

        <div className="space-y-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0])}
            />
            <span className="rounded-md border px-3 py-2 text-sm">Selecionar imagem</span>
          </label>
          <div className="text-xs text-muted-foreground">JPG/PNG até ~5MB.</div>
        </div>
      </div>

      <button
        type="submit"
        disabled={busy || !file}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
      >
        {busy ? "Enviando..." : "Salvar foto"}
      </button>

      {msg && <div className="text-sm">{msg}</div>}
    </form>
  )
}
