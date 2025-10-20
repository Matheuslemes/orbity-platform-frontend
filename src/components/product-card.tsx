"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, GitCompare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PriceTag } from "@/components/price-tag"
import { RatingStars } from "@/components/rating-stars"
import { ProductBadge } from "@/components/product-badge"
import { SpecChip } from "@/components/spec-chip"
import type { Product } from "@/lib/mock-datas"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isComparing, setIsComparing] = useState(false)

  return (
    <div
      className="group relative rounded-lg border p-4 transition-all hover:shadow-lg"
      style={{
        backgroundColor: "var(--bg-elev)",
        borderColor: "var(--border)",
      }}
    >
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.badges.map((badge) => (
            <ProductBadge key={badge} type={badge} />
          ))}
        </div>
      )}

      {/* Wishlist & Compare */}
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          style={{ backgroundColor: "var(--surface)" }}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} style={{ color: "var(--danger)" }} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          style={{ backgroundColor: isComparing ? "var(--primary)" : "var(--surface)" }}
          onClick={() => setIsComparing(!isComparing)}
        >
          <GitCompare className="h-4 w-4" style={{ color: isComparing ? "var(--bg)" : "var(--text)" }} />
        </Button>
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block mb-4">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="space-y-3">
        {/* Brand */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</p>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold leading-tight line-clamp-2 hover:underline">{product.name}</h3>
        </Link>

        {/* Specs */}
        <div className="flex flex-wrap gap-1">
          {product.highlights.slice(0, 4).map((spec, index) => (
            <SpecChip key={index}>{spec}</SpecChip>
          ))}
        </div>

        {/* Rating */}
        <RatingStars rating={product.rating.average} count={product.rating.count} size="sm" />

        {/* Price */}
        <PriceTag current={product.price.current} original={product.price.original} size="md" showInstallments />

        {/* Actions */}
        <Button asChild className="w-full" style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}>
          <Link href={`/products/${product.slug}`}>Ver detalhes</Link>
        </Button>
      </div>
    </div>
  )
}
