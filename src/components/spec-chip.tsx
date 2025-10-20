import type React from "react"
import { cn } from "@/lib/utils"

interface SpecChipProps {
  children: React.ReactNode
  className?: string
}

export function SpecChip({ children, className }: SpecChipProps) {
  return (
    <span
      className={cn("inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border", className)}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {children}
    </span>
  )
}
