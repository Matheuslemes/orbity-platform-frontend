import { cookies } from "next/headers"
import { env } from "@/lib/env"
import { SignJWT, jwtVerify, JWTPayload } from "jose"
import { resolveAuthMode } from "./mode"
import { getMockUser } from "./mock-user"

export interface SessionData {
  id: string
  name: string
  email: string
  roles?: string[]
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
}

const COOKIE = env.sessionCookieName || "orbity_session"
const SECRET = new TextEncoder().encode(env.sessionSecret || "fallback-secret-key-for-development")

/**
 * Opções padrão do cookie de sessão (httpOnly, sameSite etc.)
 */
function cookieOpts() {
  const isProduction = process.env.NODE_ENV === "production"
  return {
    httpOnly: true as const,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
  }
}

/**
 * Cria um JWT assinado com os dados da sessão
 */
export async function createSession(data: SessionData, ttl: string | number = "7d"): Promise<string> {
  const token = await new SignJWT(data as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ttl) // ex.: "7d"
    .sign(SECRET)

  return token
}

/**
 * Verifica/decodifica o JWT de sessão
 */
export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      // tolerância pequena p/ relógio do SO
      clockTolerance: 2,
    })
    return payload as unknown as SessionData
  } catch {
    return null
  }
}

/**
 * Obtém a sessão atual a partir do cookie
 * - Implementa "rolling expiration" leve: renova o cookie se estiver na metade final da validade.
 */
export async function getSession(): Promise<SessionData | null> {
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return null

  const session = await verifySession(token)
  if (!session) return null

  // rolling refresh simples (se falta < 50% do TTL, renova por mais 7d)
  const now = Math.floor(Date.now() / 1000)
  const exp = (session as any).exp as number | undefined
  const iat = (session as any).iat as number | undefined
  if (exp && iat) {
    const ttl = exp - iat
    const remaining = exp - now
    if (remaining > 0 && remaining < ttl / 2) {
      const fresh = await createSession(session, "7d")
      await setSessionCookie(fresh)
    }
  }

  return session
}

/**
 * Seta o cookie de sessão
 */
export async function setSessionCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const store = await cookies()
  store.set(COOKIE, token, { ...cookieOpts(), maxAge: maxAgeSeconds })
}

/**
 * Limpa o cookie de sessão
 */
export async function clearSessionCookie() {
  const store = await cookies()
  store.set(COOKIE, "", { ...cookieOpts(), maxAge: 0 })
}

/**
 * Requer autenticação — lança se não estiver autenticado
 */
export async function requireAuth(): Promise<SessionData> {
  const session = await getSession()
  if (!session) throw new Error("Unauthorized")
  return session
}

/**
 * Login mock:
 * - se AUTH_MODE=mock (ou cookie use_auth_mock=1), cria uma sessão a partir do MOCK_USER
 * - retorna a sessão criada para uso imediato
 */
export async function loginMock(): Promise<SessionData> {
  const mode = await resolveAuthMode()
  if (mode !== "mock") throw new Error("Auth mode is not mock")

  const user = getMockUser()
  const session: SessionData = {
    id: user.sub,
    name: user.name,
    email: user.email,
    roles: user.roles ?? ["user"],
  }

  const token = await createSession(session)
  await setSessionCookie(token)
  return session
}
