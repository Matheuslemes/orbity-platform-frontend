// src/app/company/privacy/page.tsx
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata = { title: "Política de Privacidade" }

export default function PrivacyPage() {
  const updatedAt = "29/10/2025" // ajuste quando necessário

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
             style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
          <Badge variant="outline">LGPD</Badge>
          <span>Última atualização: {updatedAt}</span>
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold">Política de Privacidade</h1>
        <p className="text-muted-foreground mt-2">
          Esta Política explica como a <strong>Orbity</strong> coleta, usa, compartilha e protege seus dados pessoais,
          em conformidade com a Lei nº 13.709/2018 (LGPD).
        </p>
      </header>

      {/* Sumário */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Sumário</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
          <li><a className="underline" href="#coleta">Dados que coletamos</a></li>
          <li><a className="underline" href="#uso">Como usamos seus dados (finalidades e bases legais)</a></li>
          <li><a className="underline" href="#compartilhamento">Compartilhamento e operadores</a></li>
          <li><a className="underline" href="#cookies">Cookies e tecnologias similares</a></li>
          <li><a className="underline" href="#retencao">Prazos de retenção</a></li>
          <li><a className="underline" href="#seguranca">Segurança da informação</a></li>
          <li><a className="underline" href="#direitos">Seus direitos como titular</a></li>
          <li><a className="underline" href="#transferencias">Transferências internacionais</a></li>
          <li><a className="underline" href="#contato">Encarregado (DPO) e contato</a></li>
          <li><a className="underline" href="#alteracoes">Alterações desta Política</a></li>
        </ol>
      </Card>

      {/* 1. Coleta */}
      <section id="coleta" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">1. Dados que coletamos</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Coletamos dados necessários para prestação dos nossos serviços de e-commerce e suporte:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Conta</strong>: nome, e-mail, telefone, senha (hash), preferências.</li>
            <li><strong>Pedidos</strong>: itens comprados, valores, endereço de entrega, CPF/CNPJ para nota.</li>
            <li><strong>Pagamento</strong>: status de pagamento e identificadores; dados sensíveis do cartão são tratados por provedores certificados (não armazenamos número completo).</li>
            <li><strong>Suporte</strong>: mensagens, anexos, gravações autorizadas para melhoria de atendimento.</li>
            <li><strong>Navegação</strong>: IP, identificadores de sessão, dispositivo, páginas acessadas (analytics).</li>
          </ul>
        </Card>
      </section>

      {/* 2. Uso */}
      <section id="uso" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">2. Como usamos seus dados (finalidades e bases legais)</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>Execução de contrato</strong>: criar conta, processar pedidos, entregar produtos, suporte.</li>
            <li><strong>Obrigação legal</strong>: emissão de notas fiscais, prevenção à fraude, registros contábeis.</li>
            <li><strong>Legítimo interesse</strong>: melhorar experiência, estatísticas de uso, prevenção de abuso (sempre com equilíbrio e opt-out quando aplicável).</li>
            <li><strong>Consentimento</strong>: comunicações de marketing e cookies não essenciais (você pode revogar a qualquer momento).</li>
          </ul>
        </Card>
      </section>

      {/* 3. Compartilhamento */}
      <section id="compartilhamento" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">3. Compartilhamento e operadores</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Compartilhamos dados com <strong>operadores</strong> que nos auxiliam a prestar o serviço, sob contratos e medidas de segurança:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Processadores de pagamento e antifraude.</li>
            <li>Logística e transportadoras para entrega e rastreamento.</li>
            <li>Serviços de hospedagem, e-mail, analytics e atendimento.</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Não vendemos dados pessoais. O compartilhamento ocorre apenas conforme as bases legais indicadas e para as finalidades descritas.
          </p>
        </Card>
      </section>

      {/* 4. Cookies */}
      <section id="cookies" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">4. Cookies e tecnologias similares</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Utilizamos cookies para funcionalidades essenciais (login, carrinho) e, com seu consentimento, para estatísticas e marketing.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Essenciais</strong>: necessários ao funcionamento do site.</li>
            <li><strong>Analíticos</strong>: ajudam a entender uso e desempenho.</li>
            <li><strong>Marketing</strong>: personalização de ofertas e campanhas.</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Você pode gerenciar preferências no banner de cookies ou nas configurações do navegador.
          </p>
        </Card>
      </section>

      {/* 5. Retenção */}
      <section id="retencao" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">5. Prazos de retenção</h2>
          <p className="text-sm text-muted-foreground">
            Mantemos dados pelo tempo necessário ao cumprimento das finalidades e obrigações legais (ex.: fiscais), 
            removendo ou anonimizando quando não forem mais necessários.
          </p>
        </Card>
      </section>

      {/* 6. Segurança */}
      <section id="seguranca" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">6. Segurança da informação</h2>
          <p className="text-sm text-muted-foreground">
            Aplicamos medidas técnicas e administrativas de segurança (criptografia em trânsito, controles de acesso, monitoramento e
            treinamento). Nenhum método é 100% seguro; em caso de incidente, seguiremos as diretrizes legais aplicáveis.
          </p>
        </Card>
      </section>

      {/* 7. Direitos do titular */}
      <section id="direitos" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">7. Seus direitos como titular</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Conforme a LGPD, você pode solicitar:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Confirmação de tratamento e acesso aos dados.</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
            <li>Portabilidade, quando aplicável.</li>
            <li>Informações sobre compartilhamentos e consequências do consentimento.</li>
            <li>Revogação do consentimento.</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Para exercer seus direitos, use os canais em <a className="underline" href="#contato">Contato</a>.
          </p>
        </Card>
      </section>

      {/* 8. Transferências internacionais */}
      <section id="transferencias" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">8. Transferências internacionais</h2>
          <p className="text-sm text-muted-foreground">
            Alguns provedores podem armazenar dados fora do Brasil. Adotamos salvaguardas adequadas (cláusulas contratuais,
            padrões de segurança e privacidade) para proteger seus dados.
          </p>
        </Card>
      </section>

      {/* 9. Contato / DPO */}
      <section id="contato" className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">9. Encarregado (DPO) e contato</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Para dúvidas ou solicitações sobre privacidade e proteção de dados:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>E-mail: <a className="underline" href="mailto:privacidade@orbity.tech">privacidade@orbity.tech</a></li>
            <li>Formulário: <Link className="underline" href="/company/contact">/company/contact</Link></li>
          </ul>
        </Card>
      </section>

      {/* 10. Alterações */}
      <section id="alteracoes" className="mb-12">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">10. Alterações desta Política</h2>
          <p className="text-sm text-muted-foreground">
            Podemos atualizar esta Política para refletir melhorias, requisitos legais ou mudanças de serviço.
            Publicaremos a nova versão no site, indicando a data de atualização.
          </p>
        </Card>
      </section>

      {/* Rodapé simples */}
      <p className="text-center text-xs text-muted-foreground">
        Esta é uma versão informativa (mock). Para operação em produção, revise com seu jurídico.
      </p>
    </main>
  )
}
