// src/app/support/tracking/page.tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PackageSearch } from "lucide-react"
import { TrackingForm } from "./tracking-form"

export const metadata = { title: "Rastreamento" }

export default function TrackingPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Rastreamento</h1>
        <p className="text-muted-foreground mt-2">Acompanhe o status do seu pedido.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Formulário */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageSearch className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Consultar pedido</h2>
            </div>
            <Badge variant="outline">Atualização em tempo real (mock)</Badge>
          </div>
          <TrackingForm />
          <p className="text-xs text-muted-foreground mt-3">
            Dica: o código de rastreio é enviado por e-mail quando o pedido é faturado.
          </p>
        </Card>

        {/* Resultado / Timeline */}
        <Card className="p-6 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Linha do tempo</h2>
          {/* O TrackingForm renderiza o resultado aqui via portal (id="tracking-result") */}
          <div id="tracking-result" className="min-h-[240px] text-sm text-muted-foreground flex items-center justify-center">
            Informe os dados ao lado para ver o status do seu pedido.
          </div>
        </Card>
      </section>
    </main>
  )
}
