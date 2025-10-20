import { cookies } from "next/headers"

export async function resolveAuthMode(): Promise<"mock"|"api"> {
  try {
    const c = await cookies()
    const v = c.get("use_auth_mock")?.value
    if (v === "1") return "mock"
    if (v === "0") return "api"
  } catch { /* build estático */ }
  return process.env.AUTH_MODE === "api" ? "api" : "mock"
}
