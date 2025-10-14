"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { TrustBadge } from "@/components/trust-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductSkeleton } from "@/components/product-skeleton"
import { useSearch, useCategories } from "@/lib/hooks/use-products"
import { Rocket, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { products: newProducts, isLoading: loadingNew } = useSearch({ sort: "newest", pageSize: 4 })
  const { products: saleProducts, isLoading: loadingSale } = useSearch({ sort: "discount", pageSize: 4 })
  const { products: gamingProducts, isLoading: loadingGaming } = useSearch({ category: "gaming", pageSize: 4 })
  const { products: laptopProducts, isLoading: loadingLaptops } = useSearch({ category: "laptops", pageSize: 4 })
  const { categories, isLoading: loadingCategories } = useCategories()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 nebula-gradient" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <Sparkles className="h-4 w-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm font-medium">Novidades toda semana</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
              Explore o Cosmos da <span style={{ color: "var(--primary)" }}>Tecnologia</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Descubra os melhores laptops, desktops, periféricos e componentes para levar sua experiência digital a
              outro nível.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="glow-primary"
                style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
              >
                <Link href="/search">
                  <Rocket className="mr-2 h-5 w-5" />
                  Explorar novidades
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild style={{ borderColor: "var(--border)" }}>
                <Link href="/search?sale=true">Ofertas da semana</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories in Orbit */}
      <section className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias em Órbita</h2>
          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 rounded-full animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category: any) => (
                <CategoryCard key={category.slug} {...category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Novidades</h2>
            <Button variant="ghost" asChild>
              <Link href="/search?sort=newest">Ver todos</Link>
            </Button>
          </div>
          {loadingNew ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stellar Offers */}
      <section className="py-16" style={{ backgroundColor: "var(--bg-elev)" }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ofertas Estelares</h2>
              <p className="text-muted-foreground">Descontos que vão além da galáxia</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/search?sort=discount">Ver todas</Link>
            </Button>
          </div>
          {loadingSale ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Themed Selections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Seleções Temáticas</h2>
          <Tabs defaultValue="gamers" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="gamers">Para Gamers</TabsTrigger>
              <TabsTrigger value="creators">Para Criadores</TabsTrigger>
              <TabsTrigger value="office">Para Escritório</TabsTrigger>
            </TabsList>

            <TabsContent value="gamers" className="space-y-6">
              {loadingGaming ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {gamingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="creators" className="space-y-6">
              {loadingLaptops ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {laptopProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="office" className="space-y-6">
              {loadingLaptops ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {laptopProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TrustBadge
              icon="shield"
              title="Garantia Oficial"
              description="Todos os produtos com garantia do fabricante"
            />
            <TrustBadge
              icon="rotate"
              title="Devolução Fácil"
              description="30 dias para trocar ou devolver sem complicação"
            />
            <TrustBadge icon="zap" title="Entrega Rápida" description="Receba em até 24h em regiões selecionadas" />
          </div>
        </div>
      </section>
    </div>
  )
}
