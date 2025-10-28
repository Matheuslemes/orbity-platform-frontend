// src/app/support/help-center/page.tsx
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Search, Truck, RotateCcw, ShieldCheck, MessageCircleMore } from "lucide-react"

export const metadata = { title: "Central de Ajuda" }

export default function HelpCenterPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Central de Ajuda</h1>
        <p className="text-muted-foreground mt-2">
          Tire dúvidas sobre pedidos, pagamento, entrega e devoluções.
        </p>

        {/* Busca simples (mock) */}
        <form
          action="/support/help-center"
          className="mt-6 flex w-full items-center gap-3"
          role="search"
          aria-label="Buscar na Central de Ajuda"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Buscar artigos: pagamento, boleto, prazo, rastreamento…"
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="secondary">Buscar</Button>
        </form>
      </header>

      {/* Ações rápidas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Rastrear Pedido</h3>
              <p className="text-sm text-muted-foreground">
                Consulte o status e a previsão de entrega.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link href="/support/tracking">Abrir rastreamento</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Trocas & Devoluções</h3>
              <p className="text-sm text-muted-foreground">
                Inicie uma devolução em até 30 dias.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link href="/support/returns">Iniciar devolução</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Garantia</h3>
              <p className="text-sm text-muted-foreground">
                Veja prazos e como acionar a garantia.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link href="/support/warranty">Ver detalhes</Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start gap-3">
            <MessageCircleMore className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Fale Conosco</h3>
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda personalizada? Fale com a gente.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link href="/company/contact">Abrir contato</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Categorias/FAQ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pedidos & Pagamentos</h2>
            <Badge variant="outline">Popular</Badge>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="p1">
              <AccordionTrigger>Quais formas de pagamento são aceitas?</AccordionTrigger>
              <AccordionContent>
                Aceitamos Pix, boleto bancário e cartões de crédito (Visa, MasterCard, Elo, Amex).
                Boleto tem compensação em até 2 dias úteis. Pix confirma na hora.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="p2">
              <AccordionTrigger>Como altero ou cancelo um pedido?</AccordionTrigger>
              <AccordionContent>
                Se o pedido ainda não foi faturado, é possível cancelar na página{" "}
                <Link href="/account/orders" className="underline">Meus Pedidos</Link>.  
                Após faturamento, solicite devolução em{" "}
                <Link href="/support/returns" className="underline">Trocas & Devoluções</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="p3">
              <AccordionTrigger>Meu pagamento foi recusado. E agora?</AccordionTrigger>
              <AccordionContent>
                Verifique dados do cartão, limite disponível e liberação para compras online.  
                Se persistir, tente outra forma de pagamento ou fale com seu banco.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Entrega & Rastreamento</h2>
            <Badge variant="outline">Atualizado</Badge>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="e1">
              <AccordionTrigger>Quais são os prazos de entrega?</AccordionTrigger>
              <AccordionContent>
                O prazo depende do CEP e do estoque. Você verá a previsão antes de concluir a compra.
                Em regiões selecionadas, oferecemos entrega em até 24h.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="e2">
              <AccordionTrigger>Como rastrear meu pedido?</AccordionTrigger>
              <AccordionContent>
                Acesse <Link href="/support/tracking" className="underline">Rastreamento</Link> e
                informe o número do pedido ou o código de rastreio enviado por e-mail.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="e3">
              <AccordionTrigger>Perdi a entrega. O que acontece?</AccordionTrigger>
              <AccordionContent>
                Haverá nova tentativa no próximo dia útil. Em algumas localidades, o pedido
                pode ficar disponível para retirada na agência mais próxima.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Devoluções & Trocas</h2>
            <Badge variant="outline">D+30</Badge>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="d1">
              <AccordionTrigger>Qual o prazo para devolver?</AccordionTrigger>
              <AccordionContent>
                Você pode solicitar devolução em até 30 dias após o recebimento, com
                a embalagem original e acessórios. Inicie em{" "}
                <Link href="/support/returns" className="underline">Trocas & Devoluções</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="d2">
              <AccordionTrigger>Quando recebo o reembolso?</AccordionTrigger>
              <AccordionContent>
                Após o item chegar e ser conferido, o reembolso é realizado:
                Pix/Cartão em até 5 dias úteis; boleto em até 10 dias úteis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="d3">
              <AccordionTrigger>Recebi um produto com defeito</AccordionTrigger>
              <AccordionContent>
                Sinto muito! Registre uma devolução como “produto com defeito” em{" "}
                <Link href="/support/returns" className="underline">Trocas & Devoluções</Link>
                {" "}ou acione a{" "}
                <Link href="/support/warranty" className="underline">Garantia</Link>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Garantia & Suporte Técnico</h2>
            <Badge variant="outline">Fabricante</Badge>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="g1">
              <AccordionTrigger>Qual o prazo de garantia?</AccordionTrigger>
              <AccordionContent>
                A maioria dos produtos tem 12 meses de garantia do fabricante. Itens específicos
                (ex.: baterias) podem ter prazos diferentes. Consulte a{" "}
                <Link href="/support/warranty" className="underline">página de Garantia</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="g2">
              <AccordionTrigger>Como acionar a garantia?</AccordionTrigger>
              <AccordionContent>
                Tenha em mãos a nota fiscal e o número de série. Siga as instruções da{" "}
                <Link href="/support/warranty" className="underline">página de Garantia</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="g3">
              <AccordionTrigger>Posso consertar por conta própria?</AccordionTrigger>
              <AccordionContent>
                Recomendamos assistência autorizada. Reparos não autorizados podem anular a garantia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </section>

      {/* Ajuda adicional */}
      <section className="mt-10">
        <Card className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Não encontrou o que procurava?</h3>
            <p className="text-sm text-muted-foreground">
              Nossa equipe responde geralmente em até <strong>24 horas úteis</strong>.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/company/about">Sobre a Orbity</Link>
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
