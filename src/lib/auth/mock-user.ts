export type MockUser = {
  sub: string
  name: string
  email: string
  roles?: string[]
  [k: string]: unknown
}

export function getMockUser(): MockUser {
  const raw = process.env.MOCK_USER
  if (!raw) return { sub: "user-123", name: "Dev Orbity", email: "dev@orbity.local", roles: ["user"] }
  try {
    return JSON.parse(raw)
  } catch {
    return { sub: "user-123", name: "Dev Orbity", email: "dev@orbity.local", roles: ["user"] }
  }
}
