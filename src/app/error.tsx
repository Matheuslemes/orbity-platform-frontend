"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  const [copyOk, setCopyOk] = useState<"idle" | "ok" | "fail">("idle");
  const isProd = useMemo(() => process.env.NODE_ENV === "production", []);
  const details = useMemo(() => {
    const base = `Message: ${error.message}`;
    return error.digest ? `${base}\nDigest: ${error.digest}` : base;
  }, [error]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(details);
      setCopyOk("ok");
      setTimeout(() => setCopyOk("idle"), 1500);
    } catch {
      setCopyOk("fail");
      setTimeout(() => setCopyOk("idle"), 1500);
    }
  };

  return (
    <html lang="pt-BR" className="dark">
      <body>
        <main className="container" role="main" aria-labelledby="error-title" style={{ display: "grid", gap: 16 }}>
          <section className="card" style={{ padding: 24, borderColor: "var(--orbity-danger)" }}>
            <h1 id="error-title" style={{ marginTop: 0 }}>Something went wrong</h1>

            {/* Em produção mostramos mensagem genérica; em dev mostramos detalhes */}
            {isProd ? (
              <p style={{ color: "var(--orbity-text-muted)", marginTop: 8 }}>
                An unexpected error occurred. Try again or go back to the home page.
              </p>
            ) : (
              <details open style={{ marginTop: 8 }}>
                <summary style={{ cursor: "pointer" }}>Details</summary>
                <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{details}</pre>
              </details>
            )}

            {error.digest && (
              <p style={{ color: "var(--orbity-text-muted)", marginTop: 8 }}>
                Error ID (digest): <code>{error.digest}</code>
              </p>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <button className="btn" onClick={reset} aria-label="Try to recover">
                Try again
              </button>
              <Link href="/" className="btn" aria-label="Go to home">
                Go home
              </Link>
              {!isProd && (
                <button className="btn" type="button" onClick={handleCopy} aria-live="polite">
                  {copyOk === "ok" ? "Copied ✓" : copyOk === "fail" ? "Copy failed" : "Copy error"}
                </button>
              )}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
