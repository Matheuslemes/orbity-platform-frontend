// src/app/support/warranty/page.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ShieldCheck, ClipboardCheck, Wrench, PackageCheck, Mail, FileWarning } from "lucide-react"

export const metadata = { title: "Garantia" }

export default function WarrantyPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Garantia</h1>
        <p className="text-muted-foreground mt-2">
          Informações sobre prazos e como acionar a garantia dos produtos comprados na Orbity.
        </p>
      </header>

      {/* Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Cobertura do fabricante</h3>
              <p className="text-sm text-muted-foreground">
                A maioria dos itens tem garantia do fabricante (geralmente 12 meses). Consulte a sua nota fiscal/manual.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <Wrench className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Assistência autorizada</h3>
              <p className="text-sm text-muted-foreground">
                Reparos são realizados por rede autorizada. Orientamos abrir chamado com o fabricante.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Documentos necessários</h3>
              <p className="text-sm text-muted-foreground">
                Tenha a nota fiscal, número de série e descrição do defeito com fotos/vídeos (quando possível).
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Como acionar */}
      <section className="mb-10">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Como acionar a garantia</h2>
            <Badge variant="outline">Passo a passo</Badge>
          </div>

          <ol className="space-y-5">
            <li className="flex items-start gap-3">
              <PackageCheck className="h-5 w-5 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">1. Separe as informações</div>
                <p className="text-sm text-muted-foreground">
                  Nota fiscal, número de série (S/N), fotos/vídeos do problema e uma breve descrição.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">2. Abra o chamado</div>
                <p className="text-sm text-muted-foreground">
                  Entre em contato com o <strong>fabricante</strong> (assistência autorizada) para registrar o protocolo.
                  Caso precise de ajuda, fale com a Orbity pela{" "}
                  <Link href="/company/contact" className="underline">página de Contato</Link>.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Wrench className="h-5 w-5 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">3. Encaminhe o produto</div>
                <p className="text-sm text-muted-foreground">
                  Siga as instruções de coleta/postagem da autorizada ou do fabricante. Guarde o comprovante.
                </p>
              </div>
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/support/help-center">Central de Ajuda</Link>
            </Button>
            <Button asChild>
              <Link href="/company/contact">Falar com o suporte Orbity</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Matriz de Cobertura (genérica) */}
      <section className="mb-10">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Cobertura por categoria (visão geral)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Categoria</th>
                  <th className="py-2 pr-4">Prazo típico</th>
                  <th className="py-2 pr-4">Exemplos cobertos</th>
                  <th className="py-2">Exceções comuns</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b">
                  <td className="py-3 pr-4 font-medium">Laptops / Desktops</td>
                  <td className="py-3 pr-4">Até 12 meses (fabricante)</td>
                  <td className="py-3 pr-4">Falhas de hardware, defeitos de fábrica</td>
                  <td className="py-3">Dano líquido, queda, uso indevido, violação de lacres</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4 font-medium">Periféricos</td>
                  <td className="py-3 pr-4">6–12 meses (fabricante)</td>
                  <td className="py-3 pr-4">Teclas falhando, desconexões sem causa externa</td>
                  <td className="py-3">Desgaste natural, cabo rompido por tração</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4 font-medium">Componentes</td>
                  <td className="py-3 pr-4">Até 12 meses (fabricante)</td>
                  <td className="py-3 pr-4">Memória com erro, GPU/SSD com falha</td>
                  <td className="py-3">Overclock fora de especificação, mau uso</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Observação: os prazos e coberturas podem variar por marca/modelo. A nota fiscal e o manual do produto são a referência principal.
          </p>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Perguntas frequentes</h2>
            <Badge variant="outline">Atualizado</Badge>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>Qual é o prazo de garantia do meu produto?</AccordionTrigger>
              <AccordionContent>
                O prazo é definido pelo fabricante e informado no manual/nota fiscal. Em muitos casos, é de até 12 meses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>A Orbity faz reparo em garantia?</AccordionTrigger>
              <AccordionContent>
                Reparos são feitos pela assistência autorizada do fabricante. A Orbity orienta você a abrir o chamado e acompanhar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Meu produto chegou com defeito. Devo acionar garantia ou devolução?</AccordionTrigger>
              <AccordionContent>
                Nos primeiros 30 dias, você pode solicitar <Link href="/support/returns" className="underline">devolução/troca</Link>.
                Após esse período, acione a garantia do fabricante.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Perdi a nota fiscal. Ainda consigo acionar?</AccordionTrigger>
              <AccordionContent>
                Em geral, a NF é necessária. Fale conosco em <Link href="/company/contact" className="underline">Contato</Link> para orientações sobre 2ª via.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>O que geralmente não é coberto?</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <FileWarning className="h-4 w-4 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Danos por queda, líquido, umidade, mau uso, modificação não autorizada, violação de lacres,
                    instalação incorreta, ou uso fora das especificações.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </section>

      {/* Ajuda adicional */}
      <section>
        <Card className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Precisa de apoio para abrir o chamado?</h3>
            <p className="text-sm text-muted-foreground">
              Nossa equipe pode orientar o passo a passo e verificar documentação.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/support/help-center">Central de Ajuda</Link>
            </Button>
            <Button asChild>
              <Link href="/company/contact">Falar com o suporte</Link>
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}
