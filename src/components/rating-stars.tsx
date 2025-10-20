import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  count?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export function RatingStars({ rating, count, size = "md", showCount = true, className }: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(sizeClasses[size], star <= Math.round(rating) ? "fill-current" : "fill-none")}
            style={{ color: "var(--warning)" }}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  )
}
