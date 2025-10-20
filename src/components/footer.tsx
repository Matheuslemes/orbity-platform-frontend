import Link from "next/link"
import { Rocket } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t mt-20" style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6" style={{ color: "var(--primary)" }} />
              <span className="text-xl font-bold">Orbity</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore o cosmos da tecnologia com os melhores produtos do mercado.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Loja</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/search?category=laptops" className="hover:text-foreground transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/search?category=desktops" className="hover:text-foreground transition-colors">
                  Desktops
                </Link>
              </li>
              <li>
                <Link href="/search?category=perifericos" className="hover:text-foreground transition-colors">
                  Periféricos
                </Link>
              </li>
              <li>
                <Link href="/search?category=componentes" className="hover:text-foreground transition-colors">
                  Componentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Garantia
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Rastreamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
          style={{ borderColor: "var(--border)" }}
        >
          <p>&copy; 2025 Orbity Tech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
