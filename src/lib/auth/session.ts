import { cookies } from "next/headers"
import { env } from "@/lib/env"
import { SignJWT, jwtVerify } from "jose"

export interface SessionData {
  id: string
  name: string
  email: string
  roles?: string[]
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
}

const secret = new TextEncoder().encode(env.sessionSecret || "fallback-secret-key-for-development")

/**
 * Create encrypted session token
 */
export async function createSession(data: SessionData): Promise<string> {
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)

  return token
}

/**
 * Verify and decode session token
 */
export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as SessionData
  } catch {
    return null
  }
}

/**
 * Get current session from cookies
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(env.sessionCookieName)?.value

  if (!token) {
    return null
  }

  return verifySession(token)
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  const isProduction = process.env.NODE_ENV === "production"

  cookieStore.set(env.sessionCookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(env.sessionCookieName)
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<SessionData> {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  return session
}
