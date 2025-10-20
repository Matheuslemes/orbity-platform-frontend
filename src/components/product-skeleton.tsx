export function ProductSkeleton() {
  return (
    <div
      className="rounded-lg border p-4 animate-pulse"
      style={{
        backgroundColor: "var(--bg-elev)",
        borderColor: "var(--border)",
      }}
    >
      <div className="aspect-square bg-muted rounded-md mb-4" />
      <div className="space-y-3">
        <div className="h-3 bg-muted rounded w-1/4" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="flex gap-1">
          <div className="h-6 bg-muted rounded-full w-16" />
          <div className="h-6 bg-muted rounded-full w-16" />
        </div>
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded w-full" />
        <div className="h-10 bg-muted rounded w-full" />
      </div>
    </div>
  )
}
