"use client";

import { useCallback, useMemo, useState } from "react";
import { useProductsList } from "@/lib/queries/catalog";
import Spinner from "@/components/ui/Spinner";
import ProductCard from "@/components/product/ProductCard";
import Pagination from "@/components/ui/Pagination";

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [q, setQ] = useState("");

  const params = useMemo(() => {
    return q ? ({ page, q } as const) : ({ page } as const);
  }, [page, q]);

  const { data, isLoading, isError, error, isFetching } = useProductsList(params as any);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setPage(0);
    },
    []
  );

  const onClear = useCallback(() => {
    setQ("");
    setPage(0);
  }, []);

  const hasEmpty = !isLoading && !isError && (!data || data.items.length === 0);
  const hasData = !!data && data.items.length > 0;

  return (
    <main className="container" style={{ display: "grid", gap: 16 }}>
      <header className="card" style={{ padding: 16 }}>
        <h1 style={{ margin: "0 0 8px" }}>Products</h1>

        <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }} role="search" aria-label="Product search">
          <label htmlFor="product-query" className="sr-only">
            Search products
          </label>
          <input
            id="product-query"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            aria-label="Search products"
            style={{
              flex: 1,
              padding: "10px 12px",
              background: "var(--orbity-surface-2)",
              border: "1px solid var(--orbity-border)",
              borderRadius: 10,
              color: "var(--orbity-text)",
            }}
          />
          <button className="btn" type="submit" title="Search">
            Search
          </button>
          <button
            className="btn"
            type="button"
            onClick={onClear}
            title="Clear"
            disabled={!q}
            aria-disabled={!q}
          >
            Clear
          </button>
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
          Failed to load products.
          <div style={{ color: "var(--orbity-text-muted)", marginTop: 6 }}>
            {(error as Error)?.message}
          </div>
        </section>
      )}

      {hasEmpty && (
        <section className="card" style={{ padding: 16 }}>
          No products found.
        </section>
      )}

      {hasData && (
        <>
          <section style={{ display: "grid", gap: 12 }}>
            {data!.items.map((p) => (
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
