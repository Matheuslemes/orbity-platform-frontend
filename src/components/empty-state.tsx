import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  showSuggestions?: boolean
}

export function EmptyState({
  title = "Nenhum produto encontrado",
  description = "Tente ajustar seus filtros ou buscar por outros termos",
  showSuggestions = true,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <SearchX className="h-16 w-16 mb-4 text-muted-foreground" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {showSuggestions && (
        <div className="space-y-4">
          <p className="text-sm font-medium">Sugestões:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/search?category=laptops">Laptops</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/search?category=desktops">Desktops</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/search?sale=true">Ofertas</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/search?filter=new">Novidades</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
