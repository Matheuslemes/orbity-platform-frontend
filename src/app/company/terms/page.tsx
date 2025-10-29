// src/app/company/terms/page.tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata = { title: "Termos de Uso" }

export default function TermsPage() {
  const updatedAt = "29/10/2025" // ajuste quando atualizar

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <Badge variant="outline">Condições Gerais</Badge>
          <span>Última atualização: {updatedAt}</span>
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold">Termos de Uso</h1>
        <p className="text-muted-foreground mt-2">
          Estas condições regulam o uso da plataforma <strong>Orbity</strong>. Ao acessar ou utilizar o site,
          você concorda com estes Termos e com a nossa{" "}
          <Link href="/company/privacy" className="underline">Política de Privacidade</Link>.
        </p>
      </header>

      {/* Sumário */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Sumário</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
          <li><a className="underline" href="#aceitacao">Aceitação dos Termos</a></li>
          <li><a className="underline" href="#elegibilidade">Elegibilidade e Cadastro</a></li>
          <li><a className="underline" href="#conta">Conta, Segurança e Responsabilidades</a></li>
          <li><a className="underline" href="#compras">Compras, Preços e Pagamentos</a></li>
          <li><a className="underline" href="#entrega">Entrega, Prazos e Risco</a></li>
          <li><a className="underline" href="#devolucoes">Trocas, Devoluções e Garantia</a></li>
          <li><a className="underline" href="#conduta">Conduta do Usuário</a></li>
          <li><a className="underline" href="#ip">Propriedade Intelectual</a></li>
          <li><a className="underline" href="#disclaimer">Isenções e Limitação de Responsabilidade</a></li>
          <li><a className="underline" href="#indenizacao">Indenização</a></li>
          <li><a className="underline" href="#alteracoes">Alterações dos Termos</a></li>
          <li><a className="underline" href="#encerramento">Encerramento</a></li>
          <li><a className="underline" href="#lei-foro">Lei Aplicável e Foro</a></li>
          <li><a className="underline" href="#contato">Contato</a></li>
        </ol>
      </Card>

      <section id="aceitacao" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">1. Aceitação dos Termos</h2>
          <p className="text-sm text-muted-foreground">
            Ao utilizar a plataforma, você declara ter lido e concordado com estes Termos. Se não concordar,
            não utilize o site. Podemos solicitar consentimentos adicionais para funcionalidades específicas.
          </p>
        </Card>
      </section>

      <section id="elegibilidade" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">2. Elegibilidade e Cadastro</h2>
          <p className="text-sm text-muted-foreground">
            O uso é permitido para pessoas com capacidade civil ou representantes legais. Algumas áreas/serviços
            podem exigir cadastro e verificação de identidade.
          </p>
        </Card>
      </section>

      <section id="conta" className="mb-8">
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">3. Conta, Segurança e Responsabilidades</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Você é responsável pela exatidão dos dados e pela confidencialidade das credenciais.</li>
            <li>Atividades realizadas na conta são presumidas como feitas por você.</li>
            <li>Notifique imediatamente usos não autorizados. Podemos suspender contas por risco de segurança.</li>
          </ul>
        </Card>
      </section>

      <section id="compras" className="mb-8">
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">4. Compras, Preços e Pagamentos</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Os preços e condições podem variar sem aviso, respeitando pedidos já confirmados.</li>
            <li>Promoções são por tempo limitado e podem ter regras específicas.</li>
            <li>Intermediamos pagamentos via parceiros; não armazenamos dados completos de cartão.</li>
            <li>Pedidos estão sujeitos a confirmação de estoque e análise antifraude.</li>
          </ul>
        </Card>
      </section>

      <section id="entrega" className="mb-8">
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">5. Entrega, Prazos e Risco</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>O prazo é exibido no checkout e pode variar por CEP e disponibilidade.</li>
            <li>O risco pela perda transfere-se no efetivo recebimento pelo destinatário.</li>
            <li>Rastreamento disponível em <Link className="underline" href="/support/tracking">/support/tracking</Link>.</li>
          </ul>
        </Card>
      </section>

      <section id="devolucoes" className="mb-8">
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">6. Trocas, Devoluções e Garantia</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Devoluções em até 30 dias conforme política: <Link className="underline" href="/support/returns">/support/returns</Link>.</li>
            <li>Garantia geralmente é do fabricante; veja <Link className="underline" href="/support/warranty">/support/warranty</Link>.</li>
            <li>Itens devem ser devolvidos com embalagem e acessórios, salvo exceções legais.</li>
          </ul>
        </Card>
      </section>

      <section id="conduta" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">7. Conduta do Usuário</h2>
          <p className="text-sm text-muted-foreground mb-2">
            É vedado utilizar a plataforma para finalidades ilícitas, prejudicar a segurança, violar direitos de
            terceiros ou interferir nos serviços. Em especial, não é permitido:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Upload de conteúdo ilícito, difamatório, ofensivo ou que infrinja propriedade intelectual.</li>
            <li>Tentativas de engenharia reversa, scraping abusivo, automações maliciosas, spam.</li>
            <li>Fraude, falsidade ideológica ou uso de dados de terceiros sem autorização.</li>
          </ul>
        </Card>
      </section>

      <section id="ip" className="mb-8">
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">8. Propriedade Intelectual</h2>
          <p className="text-sm text-muted-foreground">
            Marcas, logotipos, layout, software e conteúdos exibidos pertencem à Orbity ou a terceiros licenciantes.
            É proibido uso não autorizado, reprodução ou criação de obras derivadas sem permissão.
          </p>
        </Card>
      </section>

      <section id="disclaimer" className="mb-8">
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">9. Isenções e Limitação de Responsabilidade</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Serviços são fornecidos “como estão”, podendo haver indisponibilidades programadas ou incidentes.</li>
            <li>Não nos responsabilizamos por danos indiretos, lucros cessantes ou perdas de dados, na medida permitida em lei.</li>
            <li>Nada aqui restringe direitos do consumidor previstos na legislação aplicável.</li>
          </ul>
        </Card>
      </section>

      <section id="indenizacao" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">10. Indenização</h2>
          <p className="text-sm text-muted-foreground">
            Você concorda em indenizar a Orbity contra reivindicações decorrentes de uso indevido da plataforma
            ou violação destes Termos, na medida permitida pela legislação.
          </p>
        </Card>
      </section>

      <section id="alteracoes" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">11. Alterações dos Termos</h2>
          <p className="text-sm text-muted-foreground">
            Podemos atualizar estes Termos para refletir mudanças legais ou operacionais. Publicaremos a nova versão
            no site, indicando a data de atualização. O uso contínuo após a publicação implica concordância.
          </p>
        </Card>
      </section>

      <section id="encerramento" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">12. Encerramento</h2>
          <p className="text-sm text-muted-foreground">
            Podemos suspender ou encerrar o acesso em casos de violação, fraude, risco à segurança ou exigência legal.
            Você pode encerrar sua conta a qualquer momento, observadas obrigações pendentes.
          </p>
        </Card>
      </section>

      <section id="lei-foro" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">13. Lei Aplicável e Foro</h2>
          <p className="text-sm text-muted-foreground">
            Aplica-se a legislação brasileira. Fica eleito o foro da Comarca de São Paulo/SP, salvo disposições legais
            específicas de proteção ao consumidor que indiquem foro diverso.
          </p>
        </Card>
      </section>

      <section id="contato" className="mb-12">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">14. Contato</h2>
          <p className="text-sm text-muted-foreground">
            Dúvidas sobre estes Termos? Fale conosco em{" "}
            <Link className="underline" href="/company/contact">/company/contact</Link>.
          </p>
        </Card>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        Este texto é um modelo informativo (mock). Para uso em produção, valide com seu jurídico.
      </p>
    </main>
  )
}
