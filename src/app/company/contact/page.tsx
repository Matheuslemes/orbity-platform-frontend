// src/app/company/contact/page.tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, MessageSquareMore, Phone, MapPin } from "lucide-react"
import { ContactForm } from "./contact-form"

export const metadata = { title: "Contato" }

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Fale com a nossa equipe</h1>
        <p className="text-muted-foreground mt-2">
          Envie uma mensagem e retornamos normalmente em até <strong>24 horas úteis</strong>.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Formulário */}
        <Card className="p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquareMore className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Formulário de contato</h2>
            </div>
            <Badge variant="outline">Tempo médio: 24h</Badge>
          </div>
          <ContactForm />
          <p className="text-xs text-muted-foreground mt-3">
            Dica: dúvidas sobre pedidos? Veja a{" "}
            <Link href="/support/help-center" className="underline">Central de Ajuda</Link>.
          </p>
        </Card>

        {/* Canais e endereço (mock) */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-5">
            <h3 className="font-medium mb-2">Canais oficiais</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> suporte@orbity.tech
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> (11) 0000-0000
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-medium mb-2">Endereço (logística)</h3>
            <div className="text-sm text-muted-foreground flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>Av. Exemplo, 123 — São Paulo, SP</span>
            </div>
            <div className="mt-3">
              <Button asChild size="sm" variant="outline">
                <Link href="/support/tracking">Rastrear pedido</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
