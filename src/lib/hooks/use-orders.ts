"use client"

import useSWR from "swr"
import { bffRequest } from "@/lib/http/client"
import type { Order, OrderList, OrderStatus } from "@/lib/schemas/api"

interface OrdersParams {
  page?: number
  pageSize?: number
  status?: OrderStatus
  period?: string
}

export function useOrders(params: OrdersParams = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value))
    }
  })

  const { data, error, isLoading, mutate } = useSWR<OrderList>(
    `/orders?${searchParams.toString()}`,
    (url) => bffRequest(url),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  )

  return {
    orders: data?.items || [],
    pagination: data ? { page: data.page, pageSize: data.pageSize, total: data.total } : null,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useOrder(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Order>(id ? `/orders/${id}` : null, (url) => bffRequest(url), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  return {
    order: data,
    isLoading,
    isError: error,
    mutate,
  }
}
