import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container">
      <section className="card" style={{ padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>404 — Not Found</h1>
        <p style={{ color: "var(--orbity-text-muted)" }}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Link href="/" className="btn">Go to Home</Link>
          <Link href="/search" className="btn">Search</Link>
        </div>
      </section>
    </main>
  );
}
