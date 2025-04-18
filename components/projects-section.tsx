import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/lib/content-types"
import { SectionHeader } from "@/components/ui/section-header"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  // If no projects, don't render the section
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <SectionHeader
          title="Featured Projects"
          description="Check out some of my recent work"
          className="text-center mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug || index} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  // Handle missing fields with fallbacks
  const {
    title = "Untitled Project",
    slug = "",
    description = "No description available",
    tags = [],
    image = "/team-brainstorm.png",
  } = project

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        {image && (
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to placeholder on error
              const target = e.target as HTMLImageElement
              target.src = "/team-brainstorm.png"
            }}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded"
              >
                {tag}
              </span>
            ))}
        </div>
        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Project
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}
