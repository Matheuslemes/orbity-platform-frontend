// src/app/company/contact/page.tsx
export const metadata = { title: "Contato" }
export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contato</h1>
      <p className="text-muted-foreground">Fale com a nossa equipe.</p>
      {/* TODO: formulário de contato (nome, email, mensagem) */}
    </main>
  )
}
