import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PulseButtonProps extends ButtonProps {
  pulseColor?: "blue" | "purple" | "green" | "primary" | "secondary" | "destructive" | "accent"
  pulseIntensity?: "subtle" | "medium" | "strong"
}

const PulseButton = React.forwardRef<HTMLButtonElement, PulseButtonProps>(
  ({ className, pulseColor = "blue", pulseIntensity = "medium", variant = "default", children, ...props }, ref) => {
    const pulseColorClasses = {
      blue: "bg-blue-600/40",
      purple: "bg-purple-600/40",
      green: "bg-green-600/40",
      primary: "bg-primary/40",
      secondary: "bg-secondary/40",
      destructive: "bg-destructive/40",
      accent: "bg-accent/40",
    }

    const pulseIntensityClasses = {
      subtle: "opacity-30",
      medium: "opacity-50",
      strong: "opacity-70",
    }

    return (
      <div className="relative group inline-block">
        <div
          className={cn(
            "absolute inset-0 rounded-md animate-pulse-slow",
            pulseColorClasses[pulseColor],
            pulseIntensityClasses[pulseIntensity],
          )}
        />
        <Button ref={ref} variant={variant} className={cn("relative z-10", className)} {...props}>
          {children}
        </Button>
      </div>
    )
  },
)
PulseButton.displayName = "PulseButton"

export { PulseButton }
