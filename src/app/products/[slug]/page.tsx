"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProduct } from "@/lib/queries/catalog";
import { useCart } from "@/lib/cart/store";
import Spinner from "@/components/ui/Spinner";

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useProduct(slug);
  const cart = useCart();

  const handleAdd = () => {
    if (!data) return;
    cart.add(
      {
        id: data.id,
        name: data.name,
        price: data.price,
        currency: data.currency,
      },
      1
    );
  };

  return (
    <main className="container" style={{ display: "grid", gap: 16 }}>
      <header className="card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/products" className="btn" style={{ padding: "6px 10px" }}>
          ← Back
        </Link>

        {/* Mostra o botão mesmo durante carregamento? Prefira depois que carregar */}
        {data && (
          <button
            className="btn"
            style={{ padding: "6px 10px" }}
            onClick={handleAdd}
            disabled={!data.inStock}
            title={data.inStock ? "Add to cart" : "Out of stock"}
            aria-disabled={!data.inStock}
          >
            🛒 Add to cart
          </button>
        )}
      </header>

      {isLoading ? (
        <section className="card" style={{ padding: 16 }}>
          <Spinner /> Loading…
        </section>
      ) : isError ? (
        <section className="card" style={{ padding: 16, color: "var(--orbity-danger)" }}>
          Product not found or temporarily unavailable.
        </section>
      ) : !data ? (
        <section className="card" style={{ padding: 16 }}>
          Not found.
        </section>
      ) : (
        <article className="card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0, marginBottom: 6 }}>{data.name}</h1>
          <p style={{ color: "var(--orbity-text-muted)" }}>{data.description}</p>

          <div style={{ marginTop: 12, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <strong>
              {data.currency} {data.price.toFixed(2)}
            </strong>
            {data.inStock ? (
              <span style={{ color: "var(--orbity-success)" }}>In stock</span>
            ) : (
              <span style={{ color: "var(--orbity-warning)" }}>Out of stock</span>
            )}
          </div>

          {/* Botão secundário dentro do card (opcional) */}
          <div style={{ marginTop: 12 }}>
            <button
              className="btn"
              onClick={handleAdd}
              disabled={!data.inStock}
              title={data.inStock ? "Add to cart" : "Out of stock"}
              aria-disabled={!data.inStock}
            >
              🛒 Add to cart
            </button>
          </div>
        </article>
      )}
    </main>
  );
}
