"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockProducts } from "@/lib/mock-datas"
import { Search, Plus, MoreVertical, Edit, Copy, Archive } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/empty-state"

const statusConfig = {
  active: { label: "Ativo", color: "var(--success)" },
  draft: { label: "Rascunho", color: "var(--warning)" },
  archived: { label: "Arquivado", color: "var(--muted)" },
}

export default function BackofficeCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const products = mockProducts.map((p) => ({
    ...p,
    sku: `SKU-${p.id.padStart(6, "0")}`,
    stock: Math.floor(Math.random() * 100) + 10,
    status: Math.random() > 0.7 ? "draft" : Math.random() > 0.5 ? "archived" : "active",
  }))

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelectedProducts(selectedProducts.length === products.length ? [] : products.map((p) => p.id))
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Catálogo de Produtos</h1>
            <p className="text-muted-foreground">Gerencie seus produtos e estoque</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="glow-primary" style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Novo Produto</SheetTitle>
                <SheetDescription>Adicione um novo produto ao catálogo</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Nome do Produto</Label>
                  <Input id="product-name" placeholder="Ex: Laptop Creator Pro 14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-brand">Marca</Label>
                  <Input id="product-brand" placeholder="Ex: TechNova" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Categoria</Label>
                    <Select>
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laptops">Laptops</SelectItem>
                        <SelectItem value="desktops">Desktops</SelectItem>
                        <SelectItem value="perifericos">Periféricos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-sku">SKU</Label>
                    <Input id="product-sku" placeholder="SKU-000001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-description">Descrição</Label>
                  <Textarea id="product-description" placeholder="Descrição do produto" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Preço (R$)</Label>
                    <Input id="product-price" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-stock">Estoque</Label>
                    <Input id="product-stock" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Especificações Técnicas</Label>
                  <div className="space-y-2">
                    <Input placeholder="CPU: Ex: Intel Core i7-1360P" />
                    <Input placeholder="GPU: Ex: NVIDIA RTX 4050" />
                    <Input placeholder="RAM: Ex: 16GB DDR5" />
                    <Input placeholder="Storage: Ex: 512GB NVMe" />
                  </div>
                </div>
                <Button className="w-full" style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}>
                  Criar Produto
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Toolbar */}
        <div
          className="p-4 rounded-lg border mb-6"
          style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="desktops">Desktops</SelectItem>
                <SelectItem value="perifericos">Periféricos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm text-muted-foreground">{selectedProducts.length} selecionados</span>
              <Button variant="outline" size="sm" className="bg-transparent">
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Arquivar
              </Button>
            </div>
          )}
        </div>

        {/* Table */}
        {products.length > 0 ? (
          <div
            className="rounded-lg border overflow-hidden"
            style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "var(--border)" }}>
                    <TableHead className="w-12">
                      <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={toggleAll} />
                    </TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} style={{ borderColor: "var(--border)" }}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium line-clamp-1">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell className="font-semibold tabular-nums">
                        R$ {product.price.current.toFixed(2).replace(".", ",")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor: product.stock > 20 ? "var(--success)" + "20" : "var(--warning)" + "20",
                            color: product.stock > 20 ? "var(--success)" : "var(--warning)",
                          }}
                        >
                          {product.stock} un.
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor: statusConfig[product.status as keyof typeof statusConfig].color + "20",
                            color: statusConfig[product.status as keyof typeof statusConfig].color,
                          }}
                        >
                          {statusConfig[product.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Arquivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <EmptyState
            title="Nenhum produto encontrado"
            description="Adicione produtos ao catálogo"
            showSuggestions={false}
          />
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="default" size="sm" style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}>
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
