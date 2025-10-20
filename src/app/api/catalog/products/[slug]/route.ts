import { NextRequest, NextResponse } from "next/server"
import { CatalogDS } from "@/lib/datasource/catalog"

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const product = await CatalogDS.getBySlug(params.slug)
  if (!product) return NextResponse.json({ error: "not_found" }, { status: 404 })
  return NextResponse.json(product, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } })
}
