"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductSkeleton } from "@/components/product-skeleton"
import { EmptyState } from "@/components/empty-state"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { FiltersSheet } from "@/components/filters-sheet"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/lib/hooks/use-products"
import { X, LayoutGrid, LayoutList } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "relevance")
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)

  const { products, pagination, isLoading } = useSearch({
    q: searchParams.get("q") || undefined,
    page,
    pageSize: 24,
    sort: sortBy,
    category: searchParams.get("category") || undefined,
    brand: searchParams.get("brand") || undefined,
  })

  const activeFilters: string[] = []
  if (searchParams.get("category")) activeFilters.push(searchParams.get("category")!)
  if (searchParams.get("brand")) activeFilters.push(searchParams.get("brand")!)

  const removeFilter = (filter: string) => {
    // In real implementation, update URL params
    const params = new URLSearchParams(searchParams.toString())
    params.delete(filter)
    router.push(`/search?${params.toString()}`)
  }

  const clearAllFilters = () => {
    // In real implementation, clear URL params
    router.push("/search")
  }

  useEffect(() => {
    setSortBy(searchParams.get("sort") || "relevance")
    setPage(Number(searchParams.get("page")) || 1)
  }, [searchParams])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchParams.get("category") || "Busca"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div
              className="sticky top-20 p-6 rounded-lg border"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <FiltersSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  {pagination?.total || 0} resultado{pagination?.total !== 1 ? "s" : ""}
                </span>
                {activeFilters.length > 0 && (
                  <>
                    <span className="text-sm text-muted-foreground">•</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {activeFilters.map((filter) => (
                        <Badge
                          key={filter}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeFilter(filter)}
                        >
                          {filter}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 text-xs">
                        Limpar tudo
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filters */}
                <div className="lg:hidden">
                  <FiltersSheet />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="price-asc">Menor preço</SelectItem>
                    <SelectItem value="price-desc">Maior preço</SelectItem>
                    <SelectItem value="newest">Lançamentos</SelectItem>
                    <SelectItem value="popular">Mais vendidos</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div
                  className="hidden sm:flex items-center gap-1 border rounded-md p-1"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div
                className={
                  viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                }
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}

            {/* Pagination */}
            {pagination && pagination.total > pagination.pageSize && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Anterior
                  </Button>
                  {[...Array(Math.ceil(pagination.total / pagination.pageSize))].slice(0, 5).map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(i + 1)}
                      style={page === i + 1 ? { backgroundColor: "var(--primary)", color: "var(--bg)" } : undefined}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= Math.ceil(pagination.total / pagination.pageSize)}
                    onClick={() => setPage(page + 1)}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
