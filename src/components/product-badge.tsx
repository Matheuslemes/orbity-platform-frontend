import { cn } from "@/lib/utils"

type BadgeType = "NEW" | "SALE" | "REFURB" | "LIMITED"

interface ProductBadgeProps {
  type: BadgeType
  className?: string
}

const badgeConfig: Record<BadgeType, { label: string; color: string; bg: string }> = {
  NEW: { label: "Novo", color: "var(--text)", bg: "var(--primary)" },
  SALE: { label: "Oferta", color: "var(--bg)", bg: "var(--sale)" },
  REFURB: { label: "Recondicionado", color: "var(--text)", bg: "var(--accent)" },
  LIMITED: { label: "Edição Limitada", color: "var(--bg)", bg: "var(--warning)" },
}

export function ProductBadge({ type, className }: ProductBadgeProps) {
  const config = badgeConfig[type]

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-semibold rounded uppercase tracking-wide",
        className,
      )}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  )
}
