export default function Loading() {
  return (
    <main className="container" aria-busy="true" aria-live="polite">
      <section className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            aria-hidden
            style={{
              width: 18,
              height: 18,
              border: "2px solid rgba(255,255,255,0.25)",
              borderTopColor: "var(--orbity-accent-2)",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin .9s linear infinite",
            }}
          />
          <strong>Loading…</strong>
        </div>

        {/* Skeleton “genérico” */}
        <div
          aria-hidden
          style={{
            marginTop: 16,
            display: "grid",
            gap: 10,
          }}
        >
          <div style={{ height: 12, background: "var(--orbity-surface-2)", borderRadius: 8, opacity: 0.6 }} />
          <div style={{ height: 12, background: "var(--orbity-surface-2)", borderRadius: 8, width: "80%", opacity: 0.6 }} />
          <div style={{ height: 12, background: "var(--orbity-surface-2)", borderRadius: 8, width: "60%", opacity: 0.6 }} />
        </div>
      </section>
    </main>
  );
}
