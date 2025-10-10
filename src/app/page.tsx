// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <section className="card" style={{ padding: 28 }}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>
          Bem-vindo à <span style={{ textShadow: "0 0 18px rgba(56,189,248,0.55)" }}>Orbity</span>
        </h1>
        <p style={{ color: "var(--orbity-text-muted)", marginTop: 0 }}>
          Tema azul espacial • Next.js + TypeScript.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <Link className="btn" href="/products">Explorar catálogo</Link>
          <Link className="btn" href="/search">Buscar</Link>
        </div>
      </section>
    </main>
  );
}
