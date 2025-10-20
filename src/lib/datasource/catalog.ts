import { resolveDataMode } from "@/lib/config"
import * as mock from "./adapters/mock.catalog"
import * as api from "./adapters/api.catalog"

export const CatalogDS = {
  async search(params: { q?: string; page?: number; pageSize?: number; category?: string; sort?: "relevance"|"newest"|"discount" }) {
    const mode = await resolveDataMode()
    return mode === "mock" ? mock.mockSearch(params) : api.apiSearch(params)
  },
  async getBySlug(slug: string) {
    const mode = await resolveDataMode()
    return mode === "mock" ? mock.mockGetBySlug(slug) : api.apiGetBySlug(slug)
  },
  async getCategories() {
    const mode = await resolveDataMode()
    return mode === "mock" ? mock.mockGetCategories() : api.apiGetCategories()
  },
}
