// src/app/api/me/route.ts
import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { resolveAuthMode } from "@/lib/auth/mode"
import { getMockUser } from "@/lib/auth/mock-user"
import { CacheControl } from "@/lib/http/cache"

export async function GET() {
  try {
    const mode = await resolveAuthMode()

    // Modo MOCK: sempre retorna o usuário fictício do ENV (sem exigir login)
    if (mode === "mock") {
      const u = getMockUser()
      return NextResponse.json(
        { id: u.sub, name: u.name, email: u.email, roles: u.roles ?? ["user"] },
        { headers: CacheControl.private() }
      )
    }

    // Modo API real: exige sessão válida
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { code: "UNAUTHORIZED", message: "Not authenticated" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { id: session.id, name: session.name, email: session.email, roles: session.roles },
      { headers: CacheControl.private() }
    )
  } catch (error) {
    console.error("[v0] Get user error:", error)
    return NextResponse.json(
      { code: "GET_USER_ERROR", message: "Failed to get user" },
      { status: 500 }
    )
  }
}
