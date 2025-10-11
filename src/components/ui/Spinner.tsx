export default function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        border: "2px solid rgba(255,255,255,0.25)",
        borderTopColor: "var(--orbity-accent-2)",
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin .9s linear infinite",
      }}
    />
  );
}
