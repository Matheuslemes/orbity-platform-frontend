"use client"

import useSWR from "swr"
import { bffRequest } from "@/lib/http/client"
import type { Cart } from "@/lib/schemas/api"
import { useCallback } from "react"

export function useCart() {
  const { data, error, isLoading, mutate } = useSWR<Cart>("/cart", (url) => bffRequest(url), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  const addItem = useCallback(
    async (productId: string, sku: string, qty = 1) => {
      try {
        const cart = await bffRequest<Cart>("/cart/items", {
          method: "POST",
          body: JSON.stringify({ productId, sku, qty }),
        })
        mutate(cart, false)
        return cart
      } catch (error) {
        console.error("[v0] Add to cart failed:", error)
        throw error
      }
    },
    [mutate],
  )

  const updateItem = useCallback(
    async (itemId: string, qty: number) => {
      try {
        const cart = await bffRequest<Cart>(`/cart/items/${itemId}`, {
          method: "PATCH",
          body: JSON.stringify({ qty }),
        })
        mutate(cart, false)
        return cart
      } catch (error) {
        console.error("[v0] Update cart item failed:", error)
        throw error
      }
    },
    [mutate],
  )

  const removeItem = useCallback(
    async (itemId: string) => {
      try {
        const cart = await bffRequest<Cart>(`/cart/items/${itemId}`, {
          method: "DELETE",
        })
        mutate(cart, false)
        return cart
      } catch (error) {
        console.error("[v0] Remove cart item failed:", error)
        throw error
      }
    },
    [mutate],
  )

  const applyCoupon = useCallback(
    async (code: string) => {
      try {
        const cart = await bffRequest<Cart>("/cart/coupon", {
          method: "POST",
          body: JSON.stringify({ code }),
        })
        mutate(cart, false)
        return cart
      } catch (error) {
        console.error("[v0] Apply coupon failed:", error)
        throw error
      }
    },
    [mutate],
  )

  const removeCoupon = useCallback(async () => {
    try {
      const cart = await bffRequest<Cart>("/cart/coupon", {
        method: "DELETE",
      })
      mutate(cart, false)
      return cart
    } catch (error) {
      console.error("[v0] Remove coupon failed:", error)
      throw error
    }
  }, [mutate])

  return {
    cart: data,
    isLoading,
    isError: error,
    addItem,
    updateItem,
    removeItem,
    applyCoupon,
    removeCoupon,
    mutate,
  }
}
