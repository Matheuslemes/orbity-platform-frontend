// src/app/api/auth/login/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"
import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/lib/auth/pkce"
import { resolveAuthMode } from "@/lib/auth/mode"
import { loginMock } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const redirectTo = searchParams.get("redirect") || "/"

    // 1) Alternância MOCK ↔ API
    const authMode = await resolveAuthMode()
    if (authMode === "mock") {
      // cria a sessão local a partir do MOCK_USER (env) e redireciona
      await loginMock()
      return NextResponse.redirect(new URL(redirectTo, request.url))
    }

    // 2) Fluxo OIDC real (PKCE) — o seu código atual
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const state = generateState()

    const url = new URL(
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

    const response = NextResponse.redirect(url)

    // cookies temporários para o callback
    const common = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 600,
      path: "/",
    }
    response.cookies.set("pkce_verifier", codeVerifier, common)
    response.cookies.set("oauth_state", state, common)
    response.cookies.set("redirect_after_login", redirectTo, common)

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { code: "LOGIN_ERROR", message: "Failed to initiate login" },
      { status: 500 },
    )
  }
}
