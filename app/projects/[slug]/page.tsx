import Link from "next/link"
import { notFound } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { ContentContainer } from "@/components/ui/content-container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { getProject, getAllProjects } from "@/lib/content-api"
import { renderContentBlocks } from "@/lib/format-content"
import { ContentError } from "@/components/content-error"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"

// Add this at the top of the file, after the imports
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = await getProject(params.slug)

    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      }
    }

    return {
      title: `${project.title} | Projects | Evan Schultz`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        type: "website",
        images: [
          {
            url: project.image || "/placeholder.svg",
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
        tags: project.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description,
        images: [project.image || "/placeholder.svg"],
      },
    }
  } catch (error) {
    console.error(`Error generating metadata for project: ${params.slug}`, error)
    return {
      title: "Project | Evan Schultz",
      description: "View projects by Evan Schultz",
    }
  }
}

// Generate static params for all project pages
export async function generateStaticParams() {
  try {
    const projects = await getAllProjects()
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error("Error generating static params for projects:", error)
    return []
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  try {
    const project = await getProject(params.slug)

    if (!project) {
      notFound()
    }

    return (
      <MainLayout>
        <section className="bg-muted py-12 md:py-16">
          <ContentContainer maxWidth="3xl">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to all projects
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
            <div className="flex gap-4 mb-8">
              {project.link && (
                <Button asChild>
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Project
                  </Link>
                </Button>
              )}
              {project.github && (
                <Button variant="outline" asChild>
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Source
                  </Link>
                </Button>
              )}
              {project.v0Link && (
                <Button variant="outline" asChild>
                  <Link href={project.v0Link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View on v0.dev
                  </Link>
                </Button>
              )}
            </div>
          </ContentContainer>
        </section>

        <section className="py-12">
          <ContentContainer maxWidth="4xl">
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="grid gap-8 mb-12">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border">
                    <img src={screenshot.image || "/placeholder.svg"} alt={screenshot.alt} className="w-full" />
                  </div>
                ))}
              </div>
            )}

            <ErrorBoundaryWrapper>
              <div className="space-y-8 prose dark:prose-invert max-w-none">
                {project.fullDescription ? (
                  renderContentBlocks(project.fullDescription)
                ) : (
                  <>
                    <h2>Project Overview</h2>
                    <p>{project.description}</p>
                  </>
                )}
              </div>
            </ErrorBoundaryWrapper>
          </ContentContainer>
        </section>
      </MainLayout>
    )
  } catch (error) {
    console.error(`Error loading project: ${params.slug}`, error)
    return (
      <MainLayout>
        <ContentContainer>
          <div className="py-12">
            <ContentError
              title="Failed to Load Project"
              message="We're having trouble loading this project. Please try again later."
              backLink="/projects"
              backText="Back to Projects"
            />
          </div>
        </ContentContainer>
      </MainLayout>
    )
  }
}
