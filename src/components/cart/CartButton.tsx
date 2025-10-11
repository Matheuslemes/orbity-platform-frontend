"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useCart } from "@/lib/cart/store";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const { items, remove, clear, total } = useCart();
  const t = total();

  const close = useCallback(() => {
    setOpen(false);
    // devolve o foco para o botão que abriu
    triggerRef.current?.focus();
  }, []);

  // Esc fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // clique fora fecha
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        className="btn"
        aria-expanded={open}
        aria-controls="cart-dialog"
        onClick={() => setOpen((v) => !v)}
        title="Open cart"
      >
        🛒 Cart ({items.length})
      </button>

      {open && (
        <div
          onClick={onOverlayClick}
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.35)",
            zIndex: 49,
          }}
        >
          <div
            id="cart-dialog"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="card"
            style={{
              position: "fixed",
              right: 24,
              bottom: 24,
              width: 360,
              maxHeight: "70vh",
              overflow: "auto",
              padding: 16,
              zIndex: 50,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>Your cart</h3>
              <button className="btn" onClick={close} title="Close cart" aria-label="Close cart">✕</button>
            </div>

            {items.length === 0 ? (
              <div style={{ color: "var(--orbity-text-muted)" }}>Empty</div>
            ) : (
              <>
                <ul
                  style={{
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                    display: "grid",
                    gap: 8,
                  }}
                >
                  {items.map((i) => (
                    <li
                      key={i.id}
                      className="card"
                      style={{ padding: 10, display: "flex", justifyContent: "space-between" }}
                    >
                      <div>
                        {i.name} × {i.qty}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <strong>
                          {i.currency} {(i.price * i.qty).toFixed(2)}
                        </strong>
                        <button className="btn" onClick={() => remove(i.id)} title="Remove item">
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>
                    Total: {t.currency ?? ""} {t.amount.toFixed(2)}
                  </strong>
                  <button className="btn" onClick={clear} title="Clear cart">
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
