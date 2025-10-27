import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { DevDataToggle } from "@/components/dev-data-toggle" // (client) – aparece só em dev

export const metadata: Metadata = {
  title: "Orbity Tech - Explore o Cosmos da Tecnologia",
  description:
    "E-commerce de tecnologia com tema espacial. Laptops, desktops, periféricos e componentes.",
  applicationName: "Orbity Tech",
  icons: [{ rel: "icon", url: "/logo-orbity.jpg" }],
  openGraph: {
    title: "Orbity Tech",
    description:
      "Explore o cosmos da tecnologia — notebooks, smartphones, periféricos e componentes.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#070b16" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDev = process.env.NODE_ENV !== "production"

  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={[
          "min-h-dvh antialiased",
          "bg-background text-foreground",
          "font-sans",
          GeistSans.variable,
          GeistMono.variable,
        ].join(" ")}
      >
        <Header />

        {/* Suspense apenas no conteúdo da página */}
        <main className="min-h-[60vh]">
          <Suspense fallback={<div className="p-6">Carregando…</div>}>
            {children}
          </Suspense>
        </main>

        <Footer />

        {/* Toggle para alternar MOCK ↔ API (só em dev) */}
        {isDev ? <DevDataToggle /> : null}

        <Analytics />

        {/* No-script básico para acessibilidade */}
        <noscript>Ative o JavaScript para melhor experiência.</noscript>
      </body>
    </html>
  )
}
