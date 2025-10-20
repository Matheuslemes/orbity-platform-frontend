interface SpecListProps {
  specs: Record<string, string | string[] | undefined>
}

export function SpecList({ specs }: SpecListProps) {
  return (
    <div className="space-y-2">
      {Object.entries(specs).map(([key, value]) => {
        if (!value) return null

        const displayValue = Array.isArray(value) ? value.join(", ") : value

        return (
          <div
            key={key}
            className="flex justify-between py-3 border-b last:border-b-0"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-sm text-muted-foreground capitalize">{key}</span>
            <span className="text-sm font-medium text-right">{displayValue}</span>
          </div>
        )
      })}
    </div>
  )
}
