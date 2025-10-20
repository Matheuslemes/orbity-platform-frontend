"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QuantityStepper } from "@/components/quantity-stepper"
import { useCart } from "@/lib/hooks/use-cart"
import { Trash2, ShoppingBag, Tag } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import { ProductSkeleton } from "@/components/product-skeleton"

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem, applyCoupon, removeCoupon } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setIsApplyingCoupon(true)
    try {
      await applyCoupon(couponCode)
      setCouponCode("")
    } catch (error) {
      console.error("[v0] Failed to apply coupon:", error)
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(2)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <EmptyState
            title="Seu carrinho está vazio"
            description="Adicione produtos ao carrinho para continuar comprando"
            showSuggestions
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-lg border"
                style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
              >
                {/* Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-2 mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">SKU: {item.sku}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-lg font-bold tabular-nums" style={{ color: "var(--primary)" }}>
                      R$ {item.unitPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <QuantityStepper defaultValue={item.qty} onChange={(qty) => updateItem(item.id, qty)} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-bold tabular-nums">
                    R$ {item.subtotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            ))}

            <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/search">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continuar comprando
              </Link>
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-20 p-6 rounded-lg border space-y-6"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-bold">Resumo do Pedido</h2>

              {/* Coupon */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Cupom de desconto</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite o cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode.trim()}
                    className="bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {isApplyingCoupon ? "..." : "Aplicar"}
                  </Button>
                </div>
                {cart.discount && cart.discount > 0 && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: "var(--success)" }}>
                    <Tag className="h-4 w-4" />
                    <span>Cupom aplicado</span>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">R$ {cart.subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {cart.discount && cart.discount > 0 && (
                  <div className="flex justify-between text-sm" style={{ color: "var(--success)" }}>
                    <span>Desconto</span>
                    <span className="tabular-nums">-R$ {cart.discount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="tabular-nums" style={{ color: "var(--success)" }}>
                    {cart.shipping === 0 ? "Grátis" : `R$ ${cart.shipping?.toFixed(2).replace(".", ",")}`}
                  </span>
                </div>
                <div
                  className="flex justify-between text-lg font-bold pt-3 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span>Total</span>
                  <span className="tabular-nums" style={{ color: "var(--primary)" }}>
                    R$ {cart.total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                asChild
                size="lg"
                className="w-full glow-primary"
                style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
              >
                <Link href="/checkout">Finalizar compra</Link>
              </Button>

              {/* Trust Info */}
              <div
                className="text-xs text-muted-foreground space-y-1 pt-4 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <p>✓ Compra 100% segura</p>
                <p>✓ Frete grátis para todo Brasil</p>
                <p>✓ Parcelamento em até 12× sem juros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
