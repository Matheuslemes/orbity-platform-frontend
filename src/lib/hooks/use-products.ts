"use client"

import useSWR from "swr"
import { bffRequest } from "@/lib/http/client"
import type { Product, ProductList } from "@/lib/schemas/api"

interface SearchParams {
  q?: string
  page?: number
  pageSize?: number
  sort?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  cpu?: string
  gpu?: string
  ram?: string
  storage?: string
  display?: string
  condition?: string
}

export function useSearch(params: SearchParams) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value))
    }
  })

  const { data, error, isLoading, mutate } = useSWR<ProductList>(
    `/search?${searchParams.toString()}`,
    (url) => bffRequest(url),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  )

  return {
    products: data?.items || [],
    pagination: data ? { page: data.page, pageSize: data.pageSize, total: data.total } : null,
    facets: data?.facets,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useProduct(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    slug ? `/catalog/products/${slug}` : null,
    (url) => bffRequest(url),
    {
      revalidateOnFocus: false,
    },
  )

  return {
    product: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCategories() {
  const { data, error, isLoading } = useSWR("/catalog/categories", (url) => bffRequest(url), {
    revalidateOnFocus: false,
  })

  return {
    categories: data || [],
    isLoading,
    isError: error,
  }
}
