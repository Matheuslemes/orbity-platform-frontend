// Dados falsos apenas para desenvolvimento
export type Profile = {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  createdAt?: string
  addresses?: Array<{
    label?: string
    street: string
    city: string
    state?: string
    zip?: string
  }>
  stats?: {
    orders: number
    openCarts: number
    wishlisted: number
  }
}

export const MOCK_PROFILE: Profile = {
  id: "usr_mock_001",
  name: "Matheus Silva Lemes",
  email: "matheus@example.com",
  phone: "(11) 90000-0000",
  createdAt: "2024-09-01T10:00:00Z",
  avatar: "https://avatars.githubusercontent.com/u/1?v=4",
  addresses: [
    {
      label: "Principal",
      street: "Rua Exemplo, 123",
      city: "São Paulo",
      state: "SP",
      zip: "01000-000",
    },
  ],
  stats: { orders: 3, openCarts: 0, wishlisted: 7 },
}
