import Link from "next/link";
import type { Product } from "@/lib/schemas/catalog";

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ margin: "0 0 6px" }}>
            <Link href={`/products/${p.slug}`} className="btn" style={{ padding: "6px 10px" }}>
              {p.name}
            </Link>
          </h3>
          <p style={{ color: "var(--orbity-text-muted)", margin: 0 }}>{p.description}</p>
        </div>
        <strong style={{ whiteSpace: "nowrap" }}>{formatMoney(p.price, p.currency)}</strong>
      </div>
      {!p.inStock && (
        <div style={{ marginTop: 8, color: "var(--orbity-warning)" }}>Temporarily out of stock</div>
      )}
    </article>
  );
}
