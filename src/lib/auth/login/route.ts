// src/app/api/auth/login/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { resolveAuthMode } from "@/lib/auth/mode"
import {
  loginMock,
  clearSessionCookie,
  getSession,
  createSession,
  setSessionCookie,
} from "@/lib/auth/session"
import { env } from "@/lib/env"
import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/lib/auth/pkce"

/**
 * GET /api/auth/login
 * - Modo MOCK: cria sessão local e redireciona
 * - Modo API (OIDC): inicia fluxo PKCE e guarda dados em cookies httpOnly
 *
 * Params:
 *  - redirect: string (default "/")
 *  - remember: "1" => sessão longa
 */
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams
  const redirectTo = search.get("redirect") || "/"
  const remember = search.get("remember") === "1"

  // Alternância de modo (sem argumentos!)
  const mode = await resolveAuthMode()

  // ---------------- MOCK ----------------
  if (mode === "mock") {
    // cria a sessão mock (7d por padrão)
    await loginMock()

    // se "remember", reemite cookie com 30 dias
    if (remember) {
      const s = await getSession()
      if (s) {
        const longToken = await createSession(s, "30d")
        await setSessionCookie(longToken, 60 * 60 * 24 * 30)
      }
    }

    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  // ---------------- OIDC (API real) ----------------
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = generateState()

  const authUrl = new URL(
    `${env.oidcIssuer}/protocol/openid-connect/auth?` +
      new URLSearchParams({
        client_id: env.oidcClientId,
        redirect_uri: env.oidcRedirectUri,
        response_type: "code",
        scope: "openid profile email",
        state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      }),
  )

  const res = NextResponse.redirect(authUrl)
  const cookieBase = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600, // 10 min
  }

  res.cookies.set("pkce_verifier", codeVerifier, cookieBase)
  res.cookies.set("oauth_state", state, cookieBase)
  res.cookies.set("redirect_after_login", redirectTo, cookieBase)
  // repassa "remember" para o callback decidir TTL da sessão final
  res.cookies.set("remember_me", remember ? "1" : "0", cookieBase)

  return res
}

/**
 * DELETE /api/auth/login
 * - Limpa a sessão atual (mock ou pós-OIDC)
 */
export async function DELETE() {
  await clearSessionCookie()
  return NextResponse.json({ ok: true })
}
