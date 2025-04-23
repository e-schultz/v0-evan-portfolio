import type React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <section className={cn('bg-muted py-8 sm:py-12 md:py-16', className)}>
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          {description && <p className="text-lg md:text-xl text-muted-foreground">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
