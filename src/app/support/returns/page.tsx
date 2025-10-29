// src/app/support/returns/page.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { RotateCcw, PackageCheck, Truck, CreditCard } from "lucide-react"
import { ReturnRequestForm } from "./return-request-form"

export const metadata = { title: "Devoluções" }

export default function ReturnsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Devoluções</h1>
        <p className="text-muted-foreground mt-2">
          Como devolver um produto em até <strong>30 dias</strong> após o recebimento.
        </p>
      </header>

      {/* Resumo da política */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Prazo</h3>
              <p className="text-sm text-muted-foreground">
                Você pode solicitar devolução em até <strong>30 dias</strong>.
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <PackageCheck className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Condição do item</h3>
              <p className="text-sm text-muted-foreground">
                Com embalagem e acessórios. Sinais de uso podem impedir o reembolso integral.
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-medium">Reembolso</h3>
              <p className="text-sm text-muted-foreground">
                Em até <strong>5 dias úteis</strong> após conferência (Pix/Cartão). Boleto: até 10 dias úteis.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Passo a passo */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-medium">1. Solicite</h3>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário abaixo com seu número de pedido e motivo.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-medium">2. Envio do item</h3>
                <p className="text-sm text-muted-foreground">
                  Você recebe instruções para <strong>coleta</strong> ou <strong>postagem</strong> sem custo.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-medium">3. Reembolso</h3>
                <p className="text-sm text-muted-foreground">
                  Conferimos o produto e processamos o reembolso no mesmo método de pagamento.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Formulário */}
      <section className="mb-10">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Iniciar devolução</h2>
            <Badge variant="outline">Solicitação Online</Badge>
          </div>
          <ReturnRequestForm />
          <p className="text-xs text-muted-foreground mt-3">
            Dica: também é possível iniciar pelo menu{" "}
            <Link href="/account/orders" className="underline">Meus Pedidos</Link>.
          </p>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Perguntas frequentes</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>Minha embalagem foi aberta. Ainda posso devolver?</AccordionTrigger>
              <AccordionContent>
                Sim, desde que o produto esteja em perfeito estado e com todos os acessórios. Itens com uso
                evidente podem ter abatimento no reembolso.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Posso trocar por outro produto em vez de reembolso?</AccordionTrigger>
              <AccordionContent>
                Sim, indicamos a opção de <strong>crédito</strong> para nova compra. Informe no formulário.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>O item chegou com defeito. Devolução ou Garantia?</AccordionTrigger>
              <AccordionContent>
                Dentro de 30 dias, escolha <strong>devolução por defeito</strong> ou <strong>troca</strong>.
                Após esse prazo, acione a{" "}
                <Link href="/support/warranty" className="underline">Garantia</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Quem arca com o frete de devolução?</AccordionTrigger>
              <AccordionContent>
                Para devoluções dentro do prazo, o frete de retorno é <strong>por nossa conta</strong>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </section>

      {/* Ajuda adicional */}
      <section>
        <Card className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Precisa de ajuda em um caso específico?</h3>
            <p className="text-sm text-muted-foreground">
              Nossa equipe responde geralmente em até <strong>24 horas úteis</strong>.
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
