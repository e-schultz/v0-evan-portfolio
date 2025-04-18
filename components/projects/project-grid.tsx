import { ProjectCard } from "@/components/cards/project-card"
import type { Project } from "@/lib/content-types"

interface ProjectGridProps {
  projects: Project[]
  columns?: 1 | 2 | 3 | 4
  featured?: boolean
}

export function ProjectGrid({ projects, columns = 3, featured = false }: ProjectGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-8`}>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} featured={featured} />
      ))}
    </div>
  )
}
