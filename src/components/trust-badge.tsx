import { Shield, RotateCcw, Zap } from "lucide-react"

interface TrustBadgeProps {
  icon: "shield" | "rotate" | "zap"
  title: string
  description: string
}

const iconMap = {
  shield: Shield,
  rotate: RotateCcw,
  zap: Zap,
}

export function TrustBadge({ icon, title, description }: TrustBadgeProps) {
  const Icon = iconMap[icon]

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6" style={{ color: "var(--primary)" }} />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
