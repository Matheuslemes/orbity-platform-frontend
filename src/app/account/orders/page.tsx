"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOrders } from "@/lib/hooks/use-orders"
import { Package, CreditCard, Truck } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import { ProductSkeleton } from "@/components/product-skeleton"
import type { OrderStatus } from "@/lib/schemas/api"

const statusConfig = {
  placed: { label: "Confirmado", color: "var(--primary)" },
  paid: { label: "Pago", color: "var(--primary)" },
  processing: { label: "Em separação", color: "var(--warning)" },
  shipped: { label: "Enviado", color: "var(--accent)" },
  delivered: { label: "Entregue", color: "var(--success)" },
  canceled: { label: "Cancelado", color: "var(--destructive)" },
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [periodFilter, setPeriodFilter] = useState("all")

  const { orders, isLoading, isError } = useOrders({
    status: statusFilter !== "all" ? statusFilter : undefined,
    period: periodFilter !== "all" ? periodFilter : undefined,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <EmptyState
            title="Erro ao carregar pedidos"
            description="Não foi possível carregar seus pedidos. Tente novamente."
          />
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <EmptyState title="Nenhum pedido encontrado" description="Você ainda não fez nenhum pedido" showSuggestions />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="placed">Confirmado</SelectItem>
              <SelectItem value="processing">Em separação</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>

          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-lg border"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              {/* Order Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold">Pedido #{order.id}</h3>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: statusConfig[order.status].color + "20",
                        color: statusConfig[order.status].color,
                      }}
                    >
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Realizado em {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold tabular-nums" style={{ color: "var(--primary)" }}>
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-2">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantidade: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>
                    {order.payment.method} {order.payment.last4 && `•••• ${order.payment.last4}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>
                    {order.address.street}, {order.address.city}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button asChild variant="outline" className="bg-transparent">
                  <Link href={`/account/orders/${order.id}`}>
                    <Package className="mr-2 h-4 w-4" />
                    Ver detalhes
                  </Link>
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Repetir compra
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
