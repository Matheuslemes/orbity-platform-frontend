"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantityStepperProps {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

export function QuantityStepper({ min = 1, max = 10, defaultValue = 1, onChange }: QuantityStepperProps) {
  const [quantity, setQuantity] = useState(defaultValue)

  const increment = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  const decrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={quantity <= min}
        className="h-10 w-10 bg-transparent"
        style={{ borderColor: "var(--border)" }}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-lg font-semibold w-12 text-center tabular-nums">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={quantity >= max}
        className="h-10 w-10"
        style={{ borderColor: "var(--border)" }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
