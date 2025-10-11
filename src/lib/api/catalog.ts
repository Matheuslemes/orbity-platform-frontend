import { http } from "@/lib/api/client";
import {
  ProductListSchema,
  ProductSchema,
  type Product,
  type ProductList,
} from "@/lib/schemas/catalog";
import { DomainError } from "@/lib/api/errors";

const BASE = process.env.NEXT_PUBLIC_BASE_URL_CATALOG;

function baseUrl(): string {
  if (!BASE) {
    throw new DomainError(
      "Missing env NEXT_PUBLIC_BASE_URL_CATALOG",
      "ENV_MISSING",
      500
    );
  }
  return BASE;
}

export async function fetchProducts(
  params: { page?: number; q?: string } = {}
): Promise<ProductList> {
  const url = new URL("/products", baseUrl());
  if (params.page != null) url.searchParams.set("page", String(params.page));
  if (params.q) url.searchParams.set("q", params.q);

  const data = await http<ProductList>(url.toString());
  return ProductListSchema.parse(data);
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const url = new URL(`/products/${encodeURIComponent(slug)}`, baseUrl());
  const data = await http<Product>(url.toString());
  return ProductSchema.parse(data);
}
