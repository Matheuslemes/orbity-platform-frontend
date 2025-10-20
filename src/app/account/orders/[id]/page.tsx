"use client"

import React from "react"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OrderTimeline } from "@/components/order-timeline"
import { useOrder } from "@/lib/hooks/use-orders"
import { ArrowLeft, Download, Package } from "lucide-react"
import { ProductSkeleton } from "@/components/product-skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const statusConfig = {
  placed: { label: "Confirmado", color: "var(--primary)" },
  paid: { label: "Pago", color: "var(--primary)" },
  processing: { label: "Em separação", color: "var(--warning)" },
  shipped: { label: "Enviado", color: "var(--accent)" },
  delivered: { label: "Entregue", color: "var(--success)" },
  canceled: { label: "Cancelado", color: "var(--destructive)" },
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = React.useState<string | null>(null)

  React.useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  const { order, isLoading, isError } = useOrder(id || "")

  if (isLoading || !id) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !order) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/account/orders">Pedidos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>#{order.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para pedidos
          </Link>
        </Button>

        {/* Order Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pedido #{order.id}</h1>
            <p className="text-muted-foreground">
              Realizado em {new Date(order.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="text-base px-4 py-2 w-fit"
            style={{
              backgroundColor: statusConfig[order.status].color + "20",
              color: statusConfig[order.status].color,
            }}
          >
            {statusConfig[order.status].label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            {order.timeline && (
              <div
                className="p-6 rounded-lg border"
                style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
              >
                <h2 className="text-xl font-bold mb-6">Status do Pedido</h2>
                <OrderTimeline timeline={order.timeline} />
              </div>
            )}

            {/* Items */}
            <div
              className="p-6 rounded-lg border"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-bold mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-2 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Quantidade: {item.qty}</span>
                        <span className="text-lg font-bold tabular-nums" style={{ color: "var(--primary)" }}>
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary */}
            <div
              className="p-6 rounded-lg border"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-bold mb-4">Resumo</h2>
              <div className="space-y-3">
                <div
                  className="flex justify-between text-lg font-bold pt-3 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span>Total</span>
                  <span className="tabular-nums" style={{ color: "var(--primary)" }}>
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div
              className="p-6 rounded-lg border"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
              <p className="text-sm">
                {order.address.street}, {order.address.number}
                {order.address.complement && `, ${order.address.complement}`}
                <br />
                {order.address.neighborhood}
                <br />
                {order.address.city}, {order.address.state}
                <br />
                CEP: {order.address.postalCode}
              </p>
            </div>

            {/* Payment */}
            <div
              className="p-6 rounded-lg border"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-bold mb-4">Pagamento</h2>
              <p className="text-sm">
                {order.payment.method}
                {order.payment.last4 && (
                  <>
                    <br />
                    •••• •••• •••• {order.payment.last4}
                  </>
                )}
                {order.payment.installments && order.payment.installments > 1 && (
                  <>
                    <br />
                    {order.payment.installments}x sem juros
                  </>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Package className="mr-2 h-4 w-4" />
                Repetir compra
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Emitir nota fiscal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
