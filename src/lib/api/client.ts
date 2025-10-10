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

export async function http<T = unknown>(url: string, opts: FetchOptions = {}): Promise<T> {
  
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

  // timeout + cancelamento
  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  if (externalSignal) {

    if (externalSignal.aborted) controller.abort();

    else externalSignal.addEventListener("abort", () => controller.abort(), { once: true });

  }

  // monta headers
  const computedHeaders: Record<string, string> = { ...headers };
  if (body != null && computedHeaders["Content-Type"] == null) {

    computedHeaders["Content-Type"] = "application/json";

  }

  // build do requestInit
  const init: RequestInit = {
    method,
    headers: computedHeaders,
    ...(body != null ? ({ body: JSON.stringify(body) } as RequestInit) : {}),
    ...(cache !== undefined ? ({ cache } as RequestInit) : {}),
    signal: controller.signal,
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

      // corpo de erro
      const maybeBody = await safeJson<unknown>(res).catch(() => undefined);

      // retentavel
      if (retryOnStatuses.includes(res.status) && attempt < retries) {

    
        const wait = expoBackoff(attempt);
        await sleep(wait);

        continue;

      }

      // não retentavel - lance httpError
      throw new HttpError(`HTTP ${res.status} for ${url}`, res.status, url, maybeBody);

    } catch (err: any) {
      lastErr = err;

      // timeout / Abort
      if (err?.name === "AbortError") {
        
        if (attempt < retries) {
          
            const wait = expoBackoff(attempt);
          await sleep(wait);
          continue;

        }

        clearTimeout(timeout);
        throw new TimeoutError();

      }

      // erro de rede
      if (err instanceof TypeError) {
        
        if (attempt < retries) {
          
            const wait = expoBackoff(attempt);
          await sleep(wait);
          continue;

        }
        
        clearTimeout(timeout);
        throw new NetworkError(err.message);

      }


      // outros erros
      if (attempt < retries) {
        
        const wait = expoBackoff(attempt);
        await sleep(wait);
        continue;

      }
      clearTimeout(timeout);
    
      throw err;

    }

  }

  clearTimeout(timeout);
  throw (lastErr ?? new NetworkError("Unknown error"));
  
}