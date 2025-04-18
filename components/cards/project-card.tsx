import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/content-types"

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${featured ? "border-primary/20" : ""}`}>
      <div className={`h-64 overflow-hidden ${featured ? "md:h-80" : ""}`}>
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{project.title}</CardTitle>
        <CardDescription className="text-base">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {project.github && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
          {project.link && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Visit
              </Link>
            </Button>
          )}
          {project.v0Link && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.v0Link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> v0
              </Link>
            </Button>
          )}
        </div>
        {project.slug && (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/projects/${project.slug}`}>Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
