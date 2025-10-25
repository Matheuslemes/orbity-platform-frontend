// src/app/account/profile/edit/page.tsx
export const dynamic = "force-dynamic"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AvatarUploader } from "@/components/account/AvatarUploader"

import { cookies, headers } from "next/headers"

// Busca o usuário atual (absoluto + cookies)
async function getMe(): Promise<{ name?: string; email?: string; avatar?: string } | null> {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "http"
  const base = host ? `${proto}://${host}` : `http://localhost:${process.env.PORT ?? "3000"}`
  const c = await cookies()

  const res = await fetch(new URL("/api/me", base).toString(), {
    cache: "no-store",
    headers: { cookie: c.toString(), "content-type": "application/json" },
  })

  if (!res.ok) return null
  try {
    return await res.json()
  } catch {
    return null
  }
}

export default async function EditProfilePage() {
  const me = await getMe()
  const avatarUrl = me?.avatar ?? "/placeholder-user.jpg"

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Editar Perfil</h1>

      <div className="grid gap-6">
        {/* Foto de Perfil */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Foto de Perfil</h2>
          <AvatarUploader initialUrl={avatarUrl} />
          <p className="text-xs text-muted-foreground">
            Em produção, a imagem é enviada ao servidor/Gateway e hospedada em storage.
          </p>
        </Card>

        {/* Dados básicos (mock) */}
        <Card className="p-6 space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Seu nome" defaultValue={me?.name ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" name="email" placeholder="voce@exemplo.com" defaultValue={me?.email ?? ""} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled>
              Salvar (mock)
            </Button>
            <Button asChild variant="outline">
              <Link href="/account/profile">Cancelar</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            (Mock) Troque por um <code>action</code> server/rota POST para persistir nome/e-mail.
          </p>
        </Card>
      </div>
    </main>
  )
}
