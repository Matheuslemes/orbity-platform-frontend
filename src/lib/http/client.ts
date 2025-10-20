import { env } from "@/lib/env"

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
  timeout?: number
  idempotencyKey?: string
}

/**
 * HTTP client for API Gateway requests
 * Adds standard headers and error handling
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 30000, idempotencyKey, headers: customHeaders, ...fetchOptions } = options

  const requestId = crypto.randomUUID()
  const url = `${env.apiGatewayUrl}${path}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-Client": "orbity-storefront",
    "X-Request-Id": requestId,
    ...customHeaders,
  }

  if (idempotencyKey) {
    headers["X-Idempotency-Key"] = idempotencyKey
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
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

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T
    }

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof HttpError) {
      throw error
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new HttpError(408, "TIMEOUT", "Request timeout")
    }

    throw new HttpError(500, "NETWORK_ERROR", error instanceof Error ? error.message : "Network error")
  }
}

/**
 * BFF client for internal API routes
 */
export async function bffRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 30000, headers: customHeaders, ...fetchOptions } = options

  const url = `/api${path}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
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

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof HttpError) {
      throw error
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new HttpError(408, "TIMEOUT", "Request timeout")
    }

    throw new HttpError(500, "NETWORK_ERROR", error instanceof Error ? error.message : "Network error")
  }
}
