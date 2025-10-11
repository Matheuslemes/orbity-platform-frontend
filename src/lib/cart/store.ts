import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (i: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => { amount: number; currency: string | null };
};

export const useCart = create<CartState>((set, get) => ({
  items: [],

  add: (i, qty = 1) =>
    set((s) => {
      const exists = s.items.some((x) => x.id === i.id);

      if (exists) {
        const updated: CartItem[] = s.items.map((it) =>
          it.id === i.id ? ({ ...it, qty: it.qty + qty } satisfies CartItem) : it
        );
        return { items: updated };
      }

      const newItem: CartItem = { ...i, qty };
      return { items: [...s.items, newItem] };
    }),

  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),

  clear: () => set({ items: [] }),

  total: () => {
    const { items } = get();
    const amount = items.reduce<number>((acc, x) => acc + x.price * x.qty, 0);
    const currency = items[0]?.currency ?? null;
    return { amount, currency };
  },
}));
