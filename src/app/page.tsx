import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <section
        className="card"
        style={{
          margin: "48px auto",
          padding: 28,
          maxWidth: 720,
          background: "rgba(11,27,51,0.92)",
          border: "1px solid var(--orbity-border)",
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 8 }}>
          Bem-vindo à{" "}
          <span style={{ textShadow: "0 0 18px rgba(56,189,248,0.55)" }}>Orbity</span>
        </h1>
        <p style={{ color: "var(--orbity-text-muted)", marginTop: 0 }}>
        </p>

        <nav aria-label="Ações" style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <Link className="btn" href="/products">Explorar catálogo</Link>
          <Link className="btn" href="/search">Buscar</Link>
        </nav>
      </section>
    </div>
  );
}
