"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockProducts } from "@/lib/mock-datas"
import { Search, Upload, Check, X, Eye } from "lucide-react"
import { EmptyState } from "@/components/empty-state"

const statusConfig = {
  pending: { label: "Pendente", color: "var(--warning)" },
  approved: { label: "Aprovado", color: "var(--success)" },
  rejected: { label: "Reprovado", color: "var(--danger)" },
}

export default function BackofficeMediaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])

  // Generate media items from product images
  const mediaItems = mockProducts.flatMap((product) =>
    product.images.map((image, index) => ({
      id: `${product.id}-${index}`,
      url: image,
      name: `${product.name} - Image ${index + 1}`,
      product: product.name,
      uploadDate: "2025-01-10",
      status: Math.random() > 0.7 ? "pending" : Math.random() > 0.5 ? "rejected" : "approved",
      size: "1.2 MB",
      dimensions: "1920×1080",
    })),
  )

  const toggleMedia = (id: string) => {
    setSelectedMedia((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelectedMedia(selectedMedia.length === mediaItems.length ? [] : mediaItems.map((m) => m.id))
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Biblioteca de Mídia</h1>
            <p className="text-muted-foreground">Gerencie imagens e aprovações</p>
          </div>
          <Button className="glow-primary" style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}>
            <Upload className="mr-2 h-4 w-4" />
            Upload de Mídia
          </Button>
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
                placeholder="Buscar mídia..."
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
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Reprovado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedMedia.length > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm text-muted-foreground">{selectedMedia.length} selecionados</span>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Check className="mr-2 h-4 w-4" />
                Aprovar
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <X className="mr-2 h-4 w-4" />
                Reprovar
              </Button>
            </div>
          )}
        </div>

        {/* Media Grid */}
        {mediaItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-lg border overflow-hidden"
                style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
              >
                {/* Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selectedMedia.includes(item.id)}
                    onCheckedChange={() => toggleMedia(item.id)}
                    className="bg-background"
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{
                      backgroundColor: statusConfig[item.status as keyof typeof statusConfig].color + "20",
                      color: statusConfig[item.status as keyof typeof statusConfig].color,
                    }}
                  >
                    {statusConfig[item.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>

                {/* Image */}
                <div className="relative aspect-square">
                  <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10"
                        style={{ backgroundColor: "var(--surface)" }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="relative aspect-video w-full">
                          <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Produto</p>
                            <p className="font-medium">{item.product}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Data de Upload</p>
                            <p className="font-medium">{item.uploadDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Dimensões</p>
                            <p className="font-medium">{item.dimensions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tamanho</p>
                            <p className="font-medium">{item.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            style={{ backgroundColor: "var(--success)", color: "var(--text)" }}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Aprovar
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reprovar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10"
                    style={{ backgroundColor: "var(--success)" }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10"
                    style={{ backgroundColor: "var(--danger)" }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.uploadDate}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Nenhuma mídia encontrada" description="Faça upload de imagens" showSuggestions={false} />
        )}

        {/* Pagination */}
        {mediaItems.length > 0 && (
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
