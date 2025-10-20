import type { Product as DomainProduct } from "@/lib/domains/catalog/types"
import { mockProducts, categories as MOCK_CATEGORIES } from "@/lib/mock-datas"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Tipo inferido a partir do seu arquivo de mocks
type MockProduct = (typeof mockProducts)[number]

// Converte um produto do mock para o shape do domínio
function toDomain(p: MockProduct): DomainProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    // o domínio exige sku; usamos id como fallback
    // (se você adicionar sku no mock, ele será usado)
    sku: (p as any).sku ?? p.id,
    images: p.images,
    highlights: p.highlights,
    price: {
      current: p.price.current,
      original: p.price.original,
      // se o domínio tiver currency opcional, setamos BRL
      // (remova se não existir no seu tipo)
      // ts-expect-error - se não existir no tipo, ignore
      currency: "BRL",
    },
    rating: p.rating,
    // badges/specs podem ter tipos ligeiramente diferentes; fazemos cast leve
    badges: p.badges as any,
    specs: p.specs as any,
  } as DomainProduct
}

export async function mockSearch(opts: {
  q?: string
  page?: number
  pageSize?: number
  category?: string
  sort?: "relevance" | "newest" | "discount"
}) {
  await sleep(100)
  const { q = "", page = 1, pageSize = 12, category, sort = "relevance" } = opts

  // Trabalhamos internamente com o tipo do mock
  let list: MockProduct[] = [...mockProducts]

  // filtro por categoria (existe no mock)
  if (category) {
    const cat = category.toLowerCase()
    list = list.filter((p) => p.category.toLowerCase().includes(cat))
  }

  // filtro por texto (name, highlights, specs)
  const qn = q.trim().toLowerCase()
  if (qn) {
    list = list.filter((p) => {
      const inName = p.name.toLowerCase().includes(qn)
      const inHi = (p.highlights ?? []).some((h) => h.toLowerCase().includes(qn))
      const inSpecs = Object.values(p.specs ?? {})
        .flatMap((v) => (Array.isArray(v) ? v : [v]))
        .filter(Boolean)
        .map(String)
        .some((v) => v.toLowerCase().includes(qn))
      return inName || inHi || inSpecs
    })
  }

  // ordenação
  if (sort === "discount") {
    list.sort((a, b) => {
      const da = (a.price.original ?? a.price.current) - a.price.current
      const db = (b.price.original ?? b.price.current) - b.price.current
      return db - da
    })
  } else if (sort === "newest") {
    list.sort((a, b) => Number(b.id) - Number(a.id))
  }

  const start = (page - 1) * pageSize
  const slice = list.slice(start, start + pageSize)

  // Saída no shape do domínio
  return {
    items: slice.map(toDomain),
    page,
    pageSize,
    total: list.length,
  }
}

export async function mockGetBySlug(slug: string) {
  await sleep(60)
  const p = mockProducts.find((p) => p.slug === slug)
  return p ? toDomain(p) : null
}

export async function mockGetCategories() {
  await sleep(40)
  return MOCK_CATEGORIES
}
