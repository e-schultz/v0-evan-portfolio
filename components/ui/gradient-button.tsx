import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface GradientButtonProps extends ButtonProps {
  variant?: "blue" | "purple" | "green" | "default"
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const gradientClasses = {
      default: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
      blue: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
      purple: "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600",
      green: "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "text-white border-none shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95",
          gradientClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    )
  },
)
GradientButton.displayName = "GradientButton"

export { GradientButton }
