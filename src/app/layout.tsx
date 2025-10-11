// SERVER COMPONENT (sem "use client")
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Orbity — Frontend", template: "%s — Orbity" },
  description: "Next.js + TypeScript storefront integrating orbity-platform-backend",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061427",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Skip link sem handlers */}
        <a href="#orbity-content" className="skip-link">Pular para o conteúdo</a>

        <Providers>
          {/* Mantém o conteúdo sempre acima do fundo */}
          <main
            id="orbity-content"
            style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
