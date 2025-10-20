import { NextRequest, NextResponse } from "next/server"
import { CatalogDS } from "@/lib/datasource/catalog"
import { CacheControl } from "@/lib/http/cache"

export async function GET(req: NextRequest) {
  const qp = req.nextUrl.searchParams
  const q = qp.get("q") ?? undefined
  const page = qp.get("page") ? Number(qp.get("page")) : undefined
  const pageSize = qp.get("pageSize") ? Number(qp.get("pageSize")) : undefined
  const category = qp.get("category") ?? undefined
  const sort = (qp.get("sort") as "relevance"|"newest"|"discount") ?? "relevance"

  const data = await CatalogDS.search({ q, page, pageSize, category, sort })
  return NextResponse.json(data, { headers: CacheControl.public() })
}
