"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Rocket, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/hooks/use-cart"
import { useUser, logout } from "@/lib/auth/hooks"

export function Header() {
  const { cart } = useCart()
  const { user, isAuthenticated } = useUser()
  const cartCount = cart?.items.reduce((sum, item) => sum + item.qty, 0) || 0

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Rocket className="h-6 w-6" style={{ color: "var(--primary)" }} />
            <span className="text-xl font-bold">Orbity</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Procure por 'RTX 4070', 'SSD NVMe', 'Notebook i7'..."
                className="pl-10 w-full"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Conta</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name || "Minha Conta"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Meus Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
                <Link href="/auth/signin">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Entrar</span>
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                  >
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Carrinho</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10 w-full"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
