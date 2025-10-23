export default function LoadingProfile() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-64 rounded bg-muted/30" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-64 rounded bg-muted/20" />
          <div className="md:col-span-2 h-64 rounded bg-muted/20" />
        </div>
      </div>
    </div>
  )
}
