import { env } from "@/lib/env"


// tipos de erros
export interface ApiError {
  code: string
  message: string
  details?: unknown
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = "HttpError"
  }
}

export interface RequestOptions extends RequestInit {
  //Timeout em ms (default: 30000)
  timeout?: number
  // Header de idempotência (X-Idempotency-Key)
  idempotencyKey?: string
}

// helpers

const isServer = () => typeof window === "undefined"

// importa next/headers dinamicamente para evitar bundling em client
async function getNextHeadersApi() {
  const mod = await import("next/headers")
  // Next 15: APIs são assíncronas
  const h = await mod.headers()
  const c = await mod.cookies()
  return { h, c }
}

// base URL do próprio app (SSR). Usa NEXT_PUBLIC_SITE_URL quando disponível
async function getServerBaseUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (publicUrl) return publicUrl

  const { h } = await getNextHeadersApi()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "http"
  if (host) return `${proto}://${host}`

  const port = process.env.PORT ?? "3000"
  return `http://localhost:${port}`
}

// Une base e path em uma URL absoluta estável
function joinUrl(base: string, path: string) {
  const cleanBase = base.replace(/\/$/, "")
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return new URL(cleanPath, cleanBase).toString()
}

// Converte HeadersInit em Headers e faz merge com precedência do extra
function mergeHeaders(base?: HeadersInit, extra?: HeadersInit): Headers {
  const h = new Headers(base ?? {})
  if (extra) {
    new Headers(extra).forEach((v, k) => h.set(k, v))
  }
  return h
}

// Client para API Gateway externo
// HTTP client para chamadas ao API Gateway (externo).
// Garante URL absoluta, headers padrão, idempotency e tratamento de erros/timeouts.
 
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 30000, idempotencyKey, headers: customHeaders, ...fetchOptions } = options

  if (!env.apiGatewayUrl || !/^https?:\/\//i.test(env.apiGatewayUrl)) {
    throw new HttpError(500, "CONFIG_ERROR", "env.apiGatewayUrl must be an absolute URL (http/https)")
  }

  const requestId = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  const url = joinUrl(env.apiGatewayUrl, path)

  // Base headers
  const baseHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Client": "orbity-storefront",
    "X-Request-Id": requestId,
  }

  // Merge custom headers primeiro
  const headersMerged = mergeHeaders(baseHeaders, customHeaders)

  // Em SSR, opcionalmente repassa Authorization/Cookies se não informados
  if (isServer()) {
    const { h, c } = await getNextHeadersApi()
    const auth = h.get("authorization")
    if (auth && !headersMerged.has("authorization")) {
      headersMerged.set("authorization", auth)
    }
    if (c.size && !headersMerged.has("cookie")) {
      headersMerged.set("cookie", c.toString())
    }
  }

  if (idempotencyKey) headersMerged.set("X-Idempotency-Key", idempotencyKey)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      cache: "no-store",
      headers: headersMerged,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorData: ApiError
      try {
        errorData = await response.json()
      } catch {
        errorData = {
          code: "UNKNOWN_ERROR",
          message: response.statusText || "An error occurred",
        }
      }
      throw new HttpError(response.status, errorData.code, errorData.message, errorData.details)
    }

    if (response.status === 204) {
      return undefined as T
    }

    // content-type seguro
    const ct = response.headers.get("content-type") || ""
    if (ct.includes("application/json")) {
      return (await response.json()) as T
    }
    // fallback: texto
    return (await response.text()) as unknown as T
  } catch (error: any) {
    clearTimeout(timeoutId)

    if (error instanceof HttpError) throw error
    if (error?.name === "AbortError") throw new HttpError(408, "TIMEOUT", "Request timeout")

    // Mantém semântica: NETWORK_ERROR quando o fetch falha (DNS, conexão, etc.)
    throw new HttpError(500, "NETWORK_ERROR", error instanceof Error ? error.message : "Network error")
  }
}

// Client para BFF (/api do próprio app)
// Client para rotas internas do Next (BFF). Em SSR monta URL absoluta + repassa cookies.
export async function bffRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 30000, headers: customHeaders, ...fetchOptions } = options

  // No browser, URL relativa funciona; no SSR, precisamos de absoluta.
  const url = isServer()
    ? joinUrl(await getServerBaseUrl(), `/api${path}`)
    : `/api${path}`

  const baseHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }

  const headersMerged = mergeHeaders(baseHeaders, customHeaders)

  // Em SSR, encaminha cookies para preservar sessão (caso necessário)
  if (isServer() && !headersMerged.has("cookie")) {
    const { c } = await getNextHeadersApi()
    if (c.size) headersMerged.set("cookie", c.toString())
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      cache: "no-store",
      headers: headersMerged,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorData: ApiError
      try {
        errorData = await response.json()
      } catch {
        errorData = {
          code: "UNKNOWN_ERROR",
          message: response.statusText || "An error occurred",
        }
      }
      throw new HttpError(response.status, errorData.code, errorData.message, errorData.details)
    }

    if (response.status === 204) {
      return undefined as T
    }

    const ct = response.headers.get("content-type") || ""
    if (ct.includes("application/json")) {
      return (await response.json()) as T
    }
    return (await response.text()) as unknown as T
  } catch (error: any) {
    clearTimeout(timeoutId)

    if (error instanceof HttpError) throw error
    if (error?.name === "AbortError") throw new HttpError(408, "TIMEOUT", "Request timeout")

    throw new HttpError(500, "NETWORK_ERROR", error instanceof Error ? error.message : "Network error")
  }
}
