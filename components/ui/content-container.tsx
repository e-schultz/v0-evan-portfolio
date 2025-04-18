import type React from "react"
import { cn } from "@/lib/utils"

interface ContentContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "prose"
}

export function ContentContainer({ children, className, maxWidth = "full" }: ContentContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
    prose: "max-w-prose",
  }

  return <div className={cn("container", maxWidthClasses[maxWidth], className)}>{children}</div>
}
