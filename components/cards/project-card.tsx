import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
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
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform hover:scale-105"
          priority={false}
          loading="lazy"
        />
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
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Visit
            </a>
          )}
          {project.v0Link && (
            <a
              href={project.v0Link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> v0
            </a>
          )}
        </div>
        {project.slug && (
          <Link
            href={`/projects/${project.slug}`}
            className="hero-button inline-flex items-center justify-center px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={`View details for ${project.title}`}
            prefetch={true}
          >
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
