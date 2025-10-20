import { NextResponse } from "next/server"
import { CacheControl } from "@/lib/http/cache"
import { z, ZodError } from "zod"
import { CatalogDS } from "@/lib/datasource/catalog"

const CategorySchema = z.object({
  id: z.string().optional(),   // mock não tem id → opcional
  name: z.string(),
  slug: z.string(),
  icon: z.string().optional(),
  productCount: z.number().optional(),
})
const CategoriesSchema = z.array(CategorySchema)

export async function GET() {
  try {
    const data = await CatalogDS.getCategories()
    const validated = CategoriesSchema.parse(data)
    return NextResponse.json(validated, { headers: CacheControl.public() })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { code: "CATEGORIES_SCHEMA_INVALID", message: "Schema mismatch", issues: err.flatten() },
        { status: 502 }
      )
    }
    const message = err instanceof Error ? err.message : "Failed to get categories"
    return NextResponse.json({ code: "GET_CATEGORIES_ERROR", message }, { status: 500 })
  }
}
