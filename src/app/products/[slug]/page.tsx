import { notFound } from "next/navigation"
import { mockProducts } from "@/lib/mock-datas"
import { ProductGallery } from "@/components/product-gallery"
import { PriceTag } from "@/components/price-tag"
import { RatingStars } from "@/components/rating-stars"
import { SpecChip } from "@/components/spec-chip"
import { SpecList } from "@/components/spec-list"
import { QuantityStepper } from "@/components/quantity-stepper"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ShoppingCart, Zap, Shield, GitCompare, Heart } from "lucide-react"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = mockProducts.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const badge = product.badges.includes("SALE") ? "OFERTA" : product.badges.includes("NEW") ? "NOVO" : undefined

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
              <BreadcrumbLink href={`/search?category=${product.category.toLowerCase()}`}>
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} badge={badge} />
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</p>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{product.name}</h1>
              <p className="text-muted-foreground">Portátil premium para criadores profissionais</p>
            </div>

            {/* Rating */}
            <RatingStars rating={product.rating.average} count={product.rating.count} size="md" />

            {/* Price */}
            <div
              className="p-6 rounded-lg border"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <PriceTag current={product.price.current} original={product.price.original} size="lg" showInstallments />
            </div>

            {/* Highlights */}
            <div>
              <h3 className="font-semibold mb-3">Destaques Técnicos</h3>
              <div className="flex flex-wrap gap-2">
                {product.highlights.map((highlight, index) => (
                  <SpecChip key={index}>{highlight}</SpecChip>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantidade:</span>
                <QuantityStepper />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 glow-primary"
                  style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao carrinho
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Comprar agora
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Heart className="mr-2 h-4 w-4" />
                  Favoritar
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <GitCompare className="mr-2 h-4 w-4" />
                  Comparar
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div
              className="p-4 rounded-lg border space-y-2"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" style={{ color: "var(--success)" }} />
                <span>
                  <strong>Garantia:</strong> 12 meses | Suporte Orbity
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" style={{ color: "var(--warning)" }} />
                <span>
                  <strong>Entrega:</strong> Receba em até 24h em regiões selecionadas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mb-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList
              className="w-full justify-start border-b rounded-none h-auto p-0"
              style={{ borderColor: "var(--border)" }}
            >
              <TabsTrigger value="specs" className="rounded-none border-b-2 data-[state=active]:border-primary">
                Especificações Completas
              </TabsTrigger>
              <TabsTrigger value="compatibility" className="rounded-none border-b-2 data-[state=active]:border-primary">
                Compatibilidade
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 data-[state=active]:border-primary">
                Avaliações ({product.rating.count})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <Accordion type="multiple" defaultValue={["processor", "memory", "graphics"]} className="w-full">
                <AccordionItem value="processor">
                  <AccordionTrigger>Processador</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ CPU: product.specs.cpu }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="memory">
                  <AccordionTrigger>Memória</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ RAM: product.specs.ram }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="storage">
                  <AccordionTrigger>Armazenamento</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ Storage: product.specs.storage }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="graphics">
                  <AccordionTrigger>Gráficos</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ GPU: product.specs.gpu }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="display">
                  <AccordionTrigger>Display</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ Display: product.specs.display }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="connectivity">
                  <AccordionTrigger>Conectividade</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ Ports: product.specs.ports, Wireless: product.specs.wireless }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="battery">
                  <AccordionTrigger>Bateria & Carregamento</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ Battery: product.specs.battery }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dimensions">
                  <AccordionTrigger>Dimensões & Peso</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ Weight: product.specs.weight }} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="os">
                  <AccordionTrigger>Sistema Operacional</AccordionTrigger>
                  <AccordionContent>
                    <SpecList specs={{ OS: product.specs.os }} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="compatibility" className="mt-6">
              <div className="space-y-4">
                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <h3 className="font-semibold mb-3">Conteúdo da Caixa</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 1× {product.name}</li>
                    <li>• 1× Carregador USB-C 65W</li>
                    <li>• 1× Cabo USB-C para USB-C</li>
                    <li>• Documentação e guia de início rápido</li>
                  </ul>
                </div>

                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <h3 className="font-semibold mb-3">Compatibilidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Compatível com todos os acessórios USB-C padrão, monitores externos via HDMI 2.1 e DisplayPort, e
                    periféricos Bluetooth 5.3.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{product.rating.average.toFixed(1)}</div>
                      <RatingStars rating={product.rating.average} showCount={false} size="md" />
                      <p className="text-sm text-muted-foreground mt-2">{product.rating.count} avaliações</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--border)" }}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: "var(--warning)",
                                width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      author: "João Silva",
                      rating: 5,
                      date: "15 de Janeiro, 2025",
                      comment:
                        "Excelente laptop para criação de conteúdo. A tela é incrível e a performance é excepcional.",
                    },
                    {
                      author: "Maria Santos",
                      rating: 4,
                      date: "10 de Janeiro, 2025",
                      comment: "Muito bom, mas o preço poderia ser um pouco melhor. No geral, recomendo!",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-lg border"
                      style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <RatingStars rating={review.rating} showCount={false} size="sm" />
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
