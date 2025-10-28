// src/app/support/tracking/page.tsx
export const metadata = { title: "Rastreamento" }
export default function TrackingPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Rastreamento</h1>
      <p className="text-muted-foreground">Acompanhe o status do seu pedido.</p>
      {/* TODO: input de código de pedido + resultado */}
    </main>
  )
}
