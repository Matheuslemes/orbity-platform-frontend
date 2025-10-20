import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"
import { createSession, setSessionCookie } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
      return NextResponse.redirect(new URL("/auth/signin?error=missing_params", env.appUrl))
    }

    // Verify state
    const storedState = request.cookies.get("oauth_state")?.value
    if (state !== storedState) {
      return NextResponse.redirect(new URL("/auth/signin?error=invalid_state", env.appUrl))
    }

    // Get PKCE verifier
    const codeVerifier = request.cookies.get("pkce_verifier")?.value
    if (!codeVerifier) {
      return NextResponse.redirect(new URL("/auth/signin?error=missing_verifier", env.appUrl))
    }

    // Exchange code for tokens
    const tokenResponse = await fetch(`${env.oidcIssuer}/protocol/openid-connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: env.oidcClientId,
        code,
        redirect_uri: env.oidcRedirectUri,
        code_verifier: codeVerifier,
      }),
    })

    if (!tokenResponse.ok) {
      console.error("[v0] Token exchange failed:", await tokenResponse.text())
      return NextResponse.redirect(new URL("/auth/signin?error=token_exchange_failed", env.appUrl))
    }

    const tokens = await tokenResponse.json()

    // Get user info
    const userInfoResponse = await fetch(`${env.oidcIssuer}/protocol/openid-connect/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      console.error("[v0] User info fetch failed")
      return NextResponse.redirect(new URL("/auth/signin?error=userinfo_failed", env.appUrl))
    }

    const userInfo = await userInfoResponse.json()

    // Create session
    const sessionToken = await createSession({
      id: userInfo.sub,
      name: userInfo.name || userInfo.preferred_username,
      email: userInfo.email,
      roles: userInfo.roles || [],
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    })

    // Set session cookie
    await setSessionCookie(sessionToken)

    // Get redirect URL
    const redirectTo = request.cookies.get("redirect_after_login")?.value || "/"

    // Clear temporary cookies
    const response = NextResponse.redirect(new URL(redirectTo, env.appUrl))
    response.cookies.delete("pkce_verifier")
    response.cookies.delete("oauth_state")
    response.cookies.delete("redirect_after_login")

    return response
  } catch (error) {
    console.error("[v0] Callback error:", error)
    return NextResponse.redirect(new URL("/auth/signin?error=callback_failed", env.appUrl))
  }
}
