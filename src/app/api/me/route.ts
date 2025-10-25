// src/app/api/me/route.ts
import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { resolveAuthMode } from "@/lib/auth/mode"
import { getMockUser } from "@/lib/auth/mock-user"
import { CacheControl } from "@/lib/http/cache"

export const dynamic = "force-dynamic"

type MeResponse = {
  id: string
  name: string
  email: string
  roles: string[]
  avatar?: string
}

/** Sanitiza um valor possivelmente unknown/{} para string */
function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim().length > 0 ? v : undefined
}

export async function GET() {
  try {
    const mode = await resolveAuthMode()

    if (mode === "mock") {
      const u = getMockUser()
      const resp: MeResponse = {
        id: asString((u as any).sub) ?? "mock-user",
        name: asString((u as any).name) ?? "Usuário",
        email: asString((u as any).email) ?? "user@example.com",
        roles: Array.isArray((u as any).roles) ? (u as any).roles : ["user"],
        avatar:
          asString((u as any).picture) ??
          asString((u as any).avatar) ??
          "/avatars/dev-orbity.jpg",
      }
      return NextResponse.json(resp, { headers: CacheControl.private() })
    }

    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { code: "UNAUTHORIZED", message: "Not authenticated" },
        { status: 401 }
      )
    }

    const resp: MeResponse = {
      id: asString((session as any).id) ?? "user",
      name: asString((session as any).name) ?? "Usuário",
      email: asString((session as any).email) ?? "user@example.com",
      roles: Array.isArray((session as any).roles) ? (session as any).roles : ["user"],
      avatar:
        asString((session as any).avatar) ??
        asString((session as any).image) ??
        asString((session as any)?.user?.image) ??
        "/avatars/dev-orbity.jpg",
    }

    return NextResponse.json(resp, { headers: CacheControl.private() })
  } catch (error) {
    console.error("[v0] Get user error:", error)
    return NextResponse.json(
      { code: "GET_USER_ERROR", message: "Failed to get user" },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/me – útil em mock/dev para testar edição básica.
 * Em produção, troque para chamar o Gateway.
 */
export async function PATCH(req: Request) {
  try {
    const mode = await resolveAuthMode()
    const body = await req.json().catch(() => ({} as any))
    const name = asString(body?.name)
    const email = asString(body?.email)
    const avatar = asString(body?.avatar)

    if (mode === "mock") {
      const u = getMockUser()
      const resp: MeResponse = {
        id: asString((u as any).sub) ?? "mock-user",
        name: name ?? asString((u as any).name) ?? "Usuário",
        email: email ?? asString((u as any).email) ?? "user@example.com",
        roles: Array.isArray((u as any).roles) ? (u as any).roles : ["user"],
        avatar:
          avatar ??
          asString((u as any).picture) ??
          asString((u as any).avatar) ??
          "/avatars/dev-orbity.jpg",
      }
      // Seu CacheControl não tem noStore(); envia manualmente:
      return NextResponse.json(resp, { headers: { "Cache-Control": "no-store" } })
    }

    // Produção: integre com o Gateway aqui (ex.: apiRequest("/users/me", { method: "PATCH", ... }))
    return NextResponse.json(
      { code: "NOT_IMPLEMENTED", message: "Use o backend/Gateway para atualizar o perfil." },
      { status: 501 }
    )
  } catch (error) {
    console.error("[v0] Patch user error:", error)
    return NextResponse.json(
      { code: "PATCH_USER_ERROR", message: "Failed to update user" },
      { status: 500 }
    )
  }
}
