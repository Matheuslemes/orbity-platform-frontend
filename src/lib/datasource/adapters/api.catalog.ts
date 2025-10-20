import type { SearchResponse, Product } from "@/lib/domains/catalog/types"

const GW = process.env.API_GATEWAY_URL!

function headers() {
  return { "X-Client": "orbity-storefront", "X-Request-Id": crypto.randomUUID() }
}

export async function apiSearch(opts: {
  q?: string
  page?: number
  pageSize?: number
  category?: string
  sort?: string
}): Promise<SearchResponse> {
  const url = new URL(`${GW}/search`)
  if (opts.q) url.searchParams.set("q", opts.q)
  if (opts.page) url.searchParams.set("page", String(opts.page))
  if (opts.pageSize) url.searchParams.set("pageSize", String(opts.pageSize))
  if (opts.category) url.searchParams.set("category", opts.category)
  if (opts.sort) url.searchParams.set("sort", opts.sort)

  const res = await fetch(url, { headers: headers(), next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`search failed: ${res.status}`)
  return (await res.json()) as SearchResponse
}

export async function apiGetBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${GW}/catalog/products/${slug}`, {
    headers: headers(),
    next: { revalidate: 60 },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`pdp failed: ${res.status}`)
  return (await res.json()) as Product
}

export async function apiGetCategories() {
  const res = await fetch(`${GW}/catalog/categories`, {
    headers: headers(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`categories failed: ${res.status}`)
  return await res.json()
}
