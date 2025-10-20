import { Check, Circle } from "lucide-react"

interface TimelineItem {
  status: string
  date: string
  completed: boolean
}

interface OrderTimelineProps {
  timeline: TimelineItem[]
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${item.completed ? "glow-primary" : ""}`}
              style={{
                backgroundColor: item.completed ? "var(--primary)" : "var(--surface)",
                color: item.completed ? "var(--bg)" : "var(--muted)",
              }}
            >
              {item.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            </div>
            {index < timeline.length - 1 && (
              <div
                className="w-0.5 h-12 mt-1"
                style={{ backgroundColor: item.completed ? "var(--primary)" : "var(--border)" }}
              />
            )}
          </div>
          <div className="flex-1 pb-8">
            <p className={`font-medium ${item.completed ? "" : "text-muted-foreground"}`}>{item.status}</p>
            {item.date && <p className="text-sm text-muted-foreground">{item.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
