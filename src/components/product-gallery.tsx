"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  productName: string
  badge?: string
}

export function ProductGallery({ images, productName, badge }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square rounded-lg overflow-hidden border"
        style={{ borderColor: "var(--border)" }}
      >
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-flex items-center px-3 py-1.5 text-sm font-semibold rounded uppercase tracking-wide"
              style={{ backgroundColor: "var(--sale)", color: "var(--bg)" }}
            >
              {badge}
            </span>
          </div>
        )}

        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${productName} - Image ${currentImage + 1}`}
          fill
          className="object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
              style={{ backgroundColor: "var(--surface)" }}
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
              style={{ backgroundColor: "var(--surface)" }}
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 h-10 w-10 rounded-full"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-square w-full">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={`${productName} - Zoom`}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                currentImage === index ? "ring-2" : ""
              }`}
              style={{
                borderColor: currentImage === index ? "var(--primary)" : "var(--border)",
                ringColor: "var(--primary)",
              }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
