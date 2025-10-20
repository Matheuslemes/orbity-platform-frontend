import { cn } from "@/lib/utils"

interface PriceTagProps {
  current: number
  original?: number
  size?: "sm" | "md" | "lg"
  showInstallments?: boolean
  className?: string
}

export function PriceTag({ current, original, size = "md", showInstallments = false, className }: PriceTagProps) {
  const hasDiscount = original && original > current
  const discount = hasDiscount ? Math.round(((original - current) / original) * 100) : 0
  const installmentValue = current / 12

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-2 flex-wrap">
        {hasDiscount && (
          <span className="text-muted-foreground line-through text-sm tabular-nums">
            R$ {original.toFixed(2).replace(".", ",")}
          </span>
        )}
        <span className={cn("font-bold tabular-nums", sizeClasses[size])} style={{ color: "var(--primary)" }}>
          R$ {current.toFixed(2).replace(".", ",")}
        </span>
        {hasDiscount && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded"
            style={{ backgroundColor: "var(--sale)", color: "var(--bg)" }}
          >
            -{discount}%
          </span>
        )}
      </div>
      {showInstallments && (
        <p className="text-sm text-muted-foreground tabular-nums">
          em até 12× de R$ {installmentValue.toFixed(2).replace(".", ",")} sem juros
        </p>
      )}
      {hasDiscount && (
        <p className="text-sm font-medium" style={{ color: "var(--success)" }}>
          Economize R$ {(original - current).toFixed(2).replace(".", ",")}
        </p>
      )}
    </div>
  )
}
