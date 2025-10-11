import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().optional().default(""),
  imageUrl: z.string().url().optional(),
  price: z.number().nonnegative(),
  currency: z.string().min(1).default("USD"),
  inStock: z.boolean().default(true),
});

export const ProductListSchema = z.object({
  items: z.array(ProductSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
