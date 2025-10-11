"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useProductsList } from "@/lib/queries/catalog";
import ProductCard from "@/components/product/ProductCard";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/ui/Pagination";

export default function SearchPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState(() => sp.get("q") ?? "");
  const [page, setPage] = useState(() => Number(sp.get("page") ?? "0") || 0);

  const params: { page: number; q?: string } = useMemo(
    () => (q ? { page, q } : { page }),
    [page, q]
  );

  const { data, isLoading, isError, isFetching } = useProductsList(params);

  useEffect(() => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (page) next.set("page", String(page));

    const current = sp.toString();
    const target = next.toString();
    if (current !== target) {
      router.replace(target ? `/search?${target}` : "/search");
    }
  }, [q, page, router, sp]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
  }, []);

  const onClear = useCallback(() => {
    setQ("");
    setPage(0);
  }, []);

  const items = data?.items ?? [];
  const hasEmpty = !isLoading && !isError && items.length === 0;
  const hasData = items.length > 0;

  return (
    <main className="container" style={{ display: "grid", gap: 16 }}>
      <header className="card" style={{ padding: 16 }}>
        <h1 style={{ margin: "0 0 8px" }}>Search</h1>

        <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }} role="search" aria-label="Product search">
          <label htmlFor="search-q" className="sr-only">Search products</label>
          <input
            id="search-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type to search…"
            style={{
              width: "100%", padding: "10px 12px",
              background: "var(--orbity-surface-2)",
              border: "1px solid var(--orbity-border)",
              borderRadius: 10, color: "var(--orbity-text)",
            }}
          />
          <button className="btn" type="submit" title="Search">Search</button>
          <button className="btn" type="button" onClick={onClear} disabled={!q} aria-disabled={!q}>Clear</button>
          {isFetching && <Spinner />}
        </form>
      </header>

      {isLoading && (
        <section className="card" style={{ padding: 16 }}>
          <Spinner /> Loading…
        </section>
      )}

      {isError && (
        <section className="card" style={{ padding: 16, color: "var(--orbity-danger)" }}>
          Search unavailable. Try again later.
        </section>
      )}

      {hasEmpty && (
        <section className="card" style={{ padding: 16 }}>
          No results.
        </section>
      )}

      {hasData && (
        <>
          <section style={{ display: "grid", gap: 12 }}>
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </section>

          <footer style={{ marginTop: 4 }}>
            <Pagination
              page={page}
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => p + 1)}
              disabledPrev={page <= 0 || isFetching}
            />
          </footer>
        </>
      )}
    </main>
  );
}
