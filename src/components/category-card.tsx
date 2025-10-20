import Link from "next/link"
import { Laptop, Pi as Pc, Smartphone, Headphones, Keyboard, Cpu, Monitor, Wifi } from "lucide-react"

interface CategoryCardProps {
  name: string
  icon: string
  slug: string
}

const iconMap = {
  Laptop,
  Pc,
  Smartphone,
  Headphones,
  Keyboard,
  Cpu,
  Monitor,
  Wifi,
}

export function CategoryCard({ name, icon, slug }: CategoryCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || Laptop

  return (
    <Link
      href={`/search?category=${slug}`}
      className="group flex flex-col items-center justify-center gap-3 p-6 rounded-full aspect-square border transition-all hover:scale-105"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <Icon className="h-8 w-8 transition-colors group-hover:scale-110" style={{ color: "var(--primary)" }} />
      <span className="text-sm font-medium text-center">{name}</span>
    </Link>
  )
}
