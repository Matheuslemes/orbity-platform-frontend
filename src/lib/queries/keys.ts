export const qk = {
  products: {
    list: (params: { page: number; q?: string }) =>
      ["products", "list", params] as const,
    bySlug: (slug: string) => ["products", "by-slug", slug] as const,
  },
} as const;
