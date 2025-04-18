import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, description, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", centered && "flex flex-col items-center text-center", className)}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      <div className="w-20 h-1 bg-primary mb-6 md:mb-8"></div>
      {description && <p className="text-base md:text-lg text-muted-foreground max-w-3xl">{description}</p>}
    </div>
  )
}
