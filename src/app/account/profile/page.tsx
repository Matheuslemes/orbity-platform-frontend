import { Suspense } from "react"
import { MOCK_PROFILE, type Profile } from "./mock"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

import { cookies } from "next/headers"
import { getServerBaseUrl } from "@/lib/next/base-url"


function isMockEnabled() {
  return (
    process.env.NEXT_PUBLIC_API_MODE?.toLowerCase() === "mock" ||
    process.env.MOCK === "true"
  )
}

async function fetchProfileFromApi(): Promise<Profile | null> {
  try {

    const base = await getServerBaseUrl();
    const c = await cookies();
    const cookieHeader = c.toString();

    const url = new URL("/api/me", base).toString();

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        cookie: cookieHeader,
        "content-type": "application/json",
      },
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error(`/api/me -> ${res.status}`);

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      return null;
    }

    const profile: Profile = {
      id: data?.id ?? data?.user?.id ?? "unknown",
      name: data?.name ?? data?.user?.name ?? "Usuário",
      email: data?.email ?? data?.user?.email ?? "sem-email",
      avatar: data?.avatar ?? data?.user?.image,
      phone: data?.phone,
      createdAt: data?.createdAt ?? data?.user?.createdAt,
      addresses: data?.addresses ?? [],
      stats: data?.stats ?? undefined,
    };
    return profile;
  } catch (e) {
    console.error("[profile] API error:", e);
   
    return null;
  
  }
  
}

async function getProfile(): Promise<{ mode: "mock" | "api"; profile: Profile | null }> {
  if (isMockEnabled()) return { mode: "mock", profile: MOCK_PROFILE }
  const p = await fetchProfileFromApi()
  return { mode: "api", profile: p }
}

export default async function ProfilePage() {
  const { mode, profile } = await getProfile()

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">
          {mode === "mock" ? "Modo Mock" : "Dados da API"}
        </p>
      </header>

      <Suspense fallback={<div>Carregando…</div>}>
        {!profile ? (
          <Card className="p-6">
            <h2 className="mb-2 text-xl font-semibold">Você não está autenticado</h2>
            <p className="text-muted-foreground">
              Faça login para visualizar e editar seus dados de perfil.
            </p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/signin">Entrar</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Coluna esquerda: dados básicos */}
            <Card className="md:col-span-1 p-6">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* usa imagem local do /public */}
                <img
                  src="/placeholder-user.jpg"
                  alt={profile.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <div className="text-lg font-semibold">{profile.name}</div>
                  <div className="text-sm text-muted-foreground">{profile.email}</div>
                </div>
              </div>

              <dl className="mt-6 space-y-2 text-sm">
                {profile.phone && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Telefone</dt>
                    <dd>{profile.phone}</dd>
                  </div>
                )}
                {profile.createdAt && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Cliente desde</dt>
                    <dd>
                      {new Date(profile.createdAt).toLocaleDateString("pt-BR")}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 flex gap-2">
                <Button asChild variant="default">
                  <Link href="/account/profile/edit">Editar Perfil</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/account/orders">Meus Pedidos</Link>
                </Button>
              </div>
            </Card>

            {/* Coluna direita: endereços + stats */}
            <div className="md:col-span-2 space-y-6">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Endereços</h3>
                {profile.addresses?.length ? (
                  <ul className="space-y-3">
                    {profile.addresses.map((addr, i) => (
                      <li key={i} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <strong>{addr.label ?? `Endereço ${i + 1}`}</strong>
                          <Button size="sm" variant="ghost">
                            Editar
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {addr.street}, {addr.city}
                          {addr.state ? ` - ${addr.state}` : ""} {addr.zip ? `, ${addr.zip}` : ""}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nenhum endereço cadastrado.
                  </p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Resumo</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">
                      {profile.stats?.orders ?? 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Pedidos</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">
                      {profile.stats?.openCarts ?? 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Carrinhos</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">
                      {profile.stats?.wishlisted ?? 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Favoritos</div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </Suspense>
    </main>
  )
}
