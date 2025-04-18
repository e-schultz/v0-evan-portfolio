import { ProjectCard } from "@/components/cards/project-card"
import type { Project } from "@/lib/content-types"

interface ProjectGridProps {
  projects: Project[]
  columns?: 1 | 2 | 3 | 4
  featured?: boolean
  className?: string
}

export function ProjectGrid({ projects, columns = 3, featured = false, className = "" }: ProjectGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6 md:gap-8 ${className}`}>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} featured={featured} />
      ))}
    </div>
  )
}
