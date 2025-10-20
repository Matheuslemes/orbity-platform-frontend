import { z } from "zod"

// Common schemas
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
})

export const PriceSchema = z.object({
  current: z.number(),
  original: z.number().optional(),
  currency: z.string().default("BRL"),
  discount: z.number().optional(),
})

export const RatingSchema = z.object({
  average: z.number().min(0).max(5),
  count: z.number().int().nonnegative(),
})

export const InventorySchema = z.object({
  available: z.number().int().nonnegative(),
  isInStock: z.boolean(),
})

// Product schemas
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string().optional(),
  images: z.array(z.string()),
  sku: z.string(),
  highlights: z.array(z.string()).optional(),
  price: PriceSchema,
  inventory: InventorySchema.optional(),
  rating: RatingSchema.optional(),
  specs: z.record(z.string()).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
})

export const ProductListSchema = z.object({
  items: z.array(ProductSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  facets: z
    .record(
      z.array(
        z.object({
          value: z.string(),
          count: z.number(),
        }),
      ),
    )
    .optional(),
})

// Cart schemas
export const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  sku: z.string(),
  name: z.string(),
  image: z.string().optional(),
  unitPrice: z.number(),
  qty: z.number().int().positive(),
  subtotal: z.number(),
})

export const CartSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  subtotal: z.number(),
  discount: z.number().optional(),
  shipping: z.number().optional(),
  total: z.number(),
  currency: z.string().default("BRL"),
})

// Order schemas
export const OrderStatusSchema = z.enum(["placed", "paid", "processing", "shipped", "delivered", "canceled"])

export const AddressSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string().default("BR"),
})

export const PaymentSchema = z.object({
  method: z.enum(["credit_card", "debit_card", "pix", "boleto"]),
  last4: z.string().optional(),
  installments: z.number().optional(),
})

export const OrderTimelineSchema = z.object({
  status: z.string(),
  at: z.string(),
  description: z.string().optional(),
})

export const OrderSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  status: OrderStatusSchema,
  total: z.number(),
  items: z.array(
    z.object({
      name: z.string(),
      qty: z.number(),
      price: z.number(),
      image: z.string().optional(),
    }),
  ),
  address: AddressSchema,
  payment: PaymentSchema,
  timeline: z.array(OrderTimelineSchema).optional(),
})

export const OrderListSchema = z.object({
  items: z.array(OrderSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
})

// Customer schemas
export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  cpf: z.string().optional(),
})

// Types
export type Product = z.infer<typeof ProductSchema>
export type ProductList = z.infer<typeof ProductListSchema>
export type Cart = z.infer<typeof CartSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type OrderList = z.infer<typeof OrderListSchema>
export type OrderStatus = z.infer<typeof OrderStatusSchema>
export type Address = z.infer<typeof AddressSchema>
export type Payment = z.infer<typeof PaymentSchema>
export type Customer = z.infer<typeof CustomerSchema>
