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
    <Card
      className={`overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg ${featured ? "border-primary/30 bg-primary/5" : ""}`}
    >
      <div className={`relative h-64 overflow-hidden ${featured ? "md:h-80" : ""}`}>
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
        <CardDescription className="text-base mt-1">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pt-0">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant={featured ? "default" : "secondary"} className="font-medium">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex gap-2">
          {project.github && (
            <Button variant="ghost" size="sm" className="hover:bg-primary/10" asChild>
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
          {project.link && (
            <Button variant="ghost" size="sm" className="hover:bg-primary/10" asChild>
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Visit
              </Link>
            </Button>
          )}
          {project.v0Link && (
            <Button variant="ghost" size="sm" className="hover:bg-primary/10" asChild>
              <Link href={project.v0Link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> v0
              </Link>
            </Button>
          )}
        </div>
        {project.slug && (
          <Button variant="outline" size="sm" className="ml-auto hover:bg-primary/10 hover:text-primary" asChild>
            <Link href={`/projects/${project.slug}`}>Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
