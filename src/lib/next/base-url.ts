import { headers } from "next/headers"

export async function getServerBaseUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (publicUrl) return publicUrl

  const h = await headers() // <- agora aguardando
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "http"
  if (host) return `${proto}://${host}`

  const port = process.env.PORT ?? "3000"
  return `http://localhost:${port}`
}
