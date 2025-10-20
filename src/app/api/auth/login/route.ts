import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"
import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/lib/auth/pkce"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const redirectTo = searchParams.get("redirect") || "/"

    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    const state = generateState()

    // Store PKCE parameters in cookies for callback
    const response = NextResponse.redirect(
      new URL(
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
      ),
    )

    // Store PKCE parameters and redirect URL in cookies
    response.cookies.set("pkce_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
      path: "/",
    })

    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600,
      path: "/",
    })

    response.cookies.set("redirect_after_login", redirectTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ code: "LOGIN_ERROR", message: "Failed to initiate login" }, { status: 500 })
  }
}
