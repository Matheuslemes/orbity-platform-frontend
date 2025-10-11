"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { qk } from "./keys";
import { fetchProductBySlug, fetchProducts } from "@/lib/api/catalog";
import type { ProductList, Product } from "@/lib/schemas/catalog";

export function useProductsList(params: { page: number; q?: string }) {
  return useQuery<ProductList>({
    queryKey: qk.products.list(params),
    queryFn: () => fetchProducts(params),
    // v5: substitui keepPreviousData
    placeholderData: keepPreviousData,
    // Se já tiver defaults no QueryClient, pode remover estes:
    staleTime: 30_000,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: qk.products.bySlug(slug),
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 30_000,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
