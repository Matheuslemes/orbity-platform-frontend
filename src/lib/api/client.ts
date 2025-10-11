import { HttpError, NetworkError, TimeoutError } from "./errors";
import { safeJson } from "./parse";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FetchOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  timeoutMs?: number;
  retries?: number;
  retryOnStatuses?: number[];
  signal?: AbortSignal;
  cache?: RequestCache;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function expoBackoff(attempt: number, base = 300, cap = 4000) {
  const exp = Math.min(cap, base * 2 ** attempt);
  const jitter = Math.random() * base;
  return exp + jitter;
}

export async function http<T = unknown>(
  url: string,
  opts: FetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    timeoutMs = 10_000,
    retries = 2,
    retryOnStatuses = [429, 503, 504],
    signal: externalSignal,
    cache,
  } = opts;

  // Timeout + cancelamento
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else
      externalSignal.addEventListener("abort", () => controller.abort(), {
        once: true,
      });
  }

  // Headers
  const computedHeaders: Record<string, string> = { ...headers };
  if (body != null && computedHeaders["Content-Type"] == null) {
    computedHeaders["Content-Type"] = "application/json";
  }

  // RequestInit — com `exactOptionalPropertyTypes`, use `null` quando ausente
  const init: RequestInit = {
    method,
    headers: computedHeaders,
    body: body != null ? (JSON.stringify(body) as BodyInit) : null,
    signal: controller.signal,
    ...(cache !== undefined ? { cache } : {}),
  };

  let lastErr: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, init);

      if (res.ok) {
        if (res.status === 204) {
          clearTimeout(timeout);
          return undefined as unknown as T;
        }
        const data = await safeJson<T>(res);
        clearTimeout(timeout);
        return data;
      }

      // Tenta extrair corpo de erro (não-fatal)
      const maybeBody = await safeJson<unknown>(res).catch(() => undefined);

      // Retentável?
      if (retryOnStatuses.includes(res.status) && attempt < retries) {
        await sleep(expoBackoff(attempt));
        continue;
      }

      throw new HttpError(`HTTP ${res.status} for ${url}`, res.status, url, maybeBody);
    } catch (err: any) {
      lastErr = err;

      // Timeout / Abort
      if (err?.name === "AbortError") {
        if (attempt < retries) {
          await sleep(expoBackoff(attempt));
          continue;
        }
        clearTimeout(timeout);
        throw new TimeoutError();
      }

      // Erro de rede (fetch lança TypeError)
      if (err instanceof TypeError) {
        if (attempt < retries) {
          await sleep(expoBackoff(attempt));
          continue;
        }
        clearTimeout(timeout);
        throw new NetworkError(err.message);
      }

      // Outros erros
      if (attempt < retries) {
        await sleep(expoBackoff(attempt));
        continue;
      }
      clearTimeout(timeout);
      throw err;
    }
  }

  clearTimeout(timeout);
  throw lastErr ?? new NetworkError("Unknown error");
}
