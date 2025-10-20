import { cookies } from "next/headers"

/**
 * Define a fonte de dados:
 * - Cookie de sessão `use_mock=1|0` tem prioridade
 * - Senão, cai no ENV `DATA_MODE` (mock|api)
 */
export async function resolveDataMode(): Promise<"mock" | "api"> {
  try {
    const store = await cookies() // <— agora é async
    const c = store.get("use_mock")?.value
    if (c === "1") return "mock"
    if (c === "0") return "api"
  } catch {
    // build estático / contexto onde cookies() não existe
  }
  return process.env.DATA_MODE === "api" ? "api" : "mock"
}
