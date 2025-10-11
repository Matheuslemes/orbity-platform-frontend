export default function Pagination({
  page,
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
}: {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
}) {
  return (
    <nav aria-label="Pagination" style={{ display: "flex", gap: 8 }}>
      <button className="btn" disabled={disabledPrev} onClick={onPrev} aria-label="Previous page">
        Prev
      </button>
      <button className="btn" disabled={disabledNext} onClick={onNext} aria-label="Next page">
        Next
      </button>
      <span style={{ alignSelf: "center", color: "var(--orbity-text-muted)" }}>Page {page + 1}</span>
    </nav>
  );
}
