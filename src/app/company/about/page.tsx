// src/app/company/about/page.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Rocket, Target, Trophy, Users, ShieldCheck, Globe2, Sparkles } from "lucide-react"

export const metadata = { title: "Sobre Nós" }

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Desde 2025
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold">Sobre a Orbity</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          A Orbity nasceu para simplificar a jornada de compra de tecnologia — com curadoria técnica,
          atendimento humano e uma experiência rápida e transparente do clique à entrega.
        </p>
      </header>

      {/* Missão / Visão / Valores */}
      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5" />
            <div>
              <h3 className="font-semibold">Missão</h3>
              <p className="text-sm text-muted-foreground">
                Capacitar pessoas e empresas a atingirem seu potencial com tecnologia confiável e acessível.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Globe2 className="mt-0.5 h-5 w-5" />
            <div>
              <h3 className="font-semibold">Visão</h3>
              <p className="text-sm text-muted-foreground">
                Ser referência em e-commerce tech com experiência de ponta e suporte que encurta distâncias.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5" />
            <div>
              <h3 className="font-semibold">Valores</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Transparência</li>
                <li>Excelência em atendimento</li>
                <li>Curadoria técnica</li>
                <li>Responsabilidade com o cliente</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Métricas (mock) */}
      <section className="mb-10">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold">1.2k+</div>
              <div className="text-xs text-muted-foreground">Produtos selecionados</div>
            </div>
            <div>
              <div className="text-2xl font-bold">9.6/10</div>
              <div className="text-xs text-muted-foreground">Satisfação média</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24h</div>
              <div className="text-xs text-muted-foreground">Entrega em regiões</div>
            </div>
            <div>
              <div className="text-2xl font-bold">+20</div>
              <div className="text-xs text-muted-foreground">Parceiros oficiais</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Diferenciais */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">O que nos move</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Rocket className="mt-0.5 h-5 w-5" />
              <div>
                <h3 className="font-medium">Performance e inovação</h3>
                <p className="text-sm text-muted-foreground">
                  Curadoria técnica e benchmarks reais para recomendar o melhor custo-benefício.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5" />
              <div>
                <h3 className="font-medium">Atendimento humano</h3>
                <p className="text-sm text-muted-foreground">
                  Suporte próximo, sem roteiros engessados — resolvemos o seu problema.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Trophy className="mt-0.5 h-5 w-5" />
              <div>
                <h3 className="font-medium">Experiência premium</h3>
                <p className="text-sm text-muted-foreground">
                  Entregas rápidas, rastreamento claro e política de trocas descomplicada.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Linha do tempo (fix para sobreposição) */}
      <section className="mb-10">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Nossa jornada</h2>
            <Badge variant="outline">Roadmap</Badge>
          </div>

          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border md:left-4" aria-hidden="true" />

            <ul className="space-y-8">
              {/* 2025 */}
              <li className="relative pl-8 md:pl-10">
                <span
                  className="absolute left-2 top-1.5 h-3 w-3 rounded-full bg-primary ring-2 ring-background md:left-3"
                  aria-hidden="true"
                />
                <div className="text-xs text-muted-foreground">2025</div>
                <div className="font-semibold leading-snug">Lançamento da Orbity</div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Catálogo inicial e operação própria de fulfillment.
                </p>
              </li>

              {/* 2026 */}
              <li className="relative pl-8 md:pl-10">
                <span
                  className="absolute left-2 top-1.5 h-3 w-3 rounded-full bg-muted ring-2 ring-background md:left-3"
                  aria-hidden="true"
                />
                <div className="text-xs text-muted-foreground">2026</div>
                <div className="font-semibold leading-snug">Parcerias estratégicas</div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Integrações com fabricantes e logística expandida.
                </p>
              </li>

              {/* 2027 */}
              <li className="relative pl-8 md:pl-10">
                <span
                  className="absolute left-2 top-1.5 h-3 w-3 rounded-full bg-muted ring-2 ring-background md:left-3"
                  aria-hidden="true"
                />
                <div className="text-xs text-muted-foreground">2027</div>
                <div className="font-semibold leading-snug">Marketplace de especialistas</div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sellers curados com SLA de qualidade Orbity.
                </p>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section>
        <Card className="flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
          <div>
            <h3 className="font-semibold">Quer falar com a gente?</h3>
            <p className="text-sm text-muted-foreground">
              Estamos prontos para ajudar em compras, parcerias e suporte.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/support/help-center">Central de Ajuda</Link>
            </Button>
            <Button asChild>
              <Link href="/company/contact">Falar com o time</Link>
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}
