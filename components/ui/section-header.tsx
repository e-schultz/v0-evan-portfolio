interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary/70 rounded-full"></span>
      </h2>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  )
}
