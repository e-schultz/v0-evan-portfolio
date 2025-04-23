import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getProject } from "@/lib/content-api"
import { ContentContainer } from "@/components/ui/content-container"
import { ContentError } from "@/components/content-error"
import { formatContent } from "@/lib/format-content"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Define params type
type ProjectPageParams = {
  slug: string
}

// Define the page props type
type ProjectPageProps = {
  params: ProjectPageParams
  searchParams?: Record<string, string | string[] | undefined>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const slug = params.slug
  const project = await getProject(slug)

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
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  )
}

function ProjectPageSkeleton() {
  return (
    <ContentContainer>
      <div className="py-8">
        <div className="flex items-center mb-8">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="h-10 w-3/4 bg-muted animate-pulse rounded mb-4"></div>
          <div className="h-6 w-full bg-muted animate-pulse rounded mb-8"></div>
          <div className="aspect-video w-full bg-muted animate-pulse rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse rounded"></div>
            <div className="h-4 bg-muted animate-pulse rounded"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}

async function ProjectContent({ params }: { params: ProjectPageParams }) {
  const slug = params.slug
  const project = await getProject(slug)

  if (!project) {
    return (
      <ContentContainer>
        <div className="py-12">
          <ContentError
            title="Project Not Found"
            message="The requested project could not be found."
            backLink="/projects"
            backText="Back to Projects"
          />
        </div>
      </ContentContainer>
    )
  }

  return (
    <ContentContainer className="py-8 px-4 md:px-6">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" size="sm">
          <Link href="/projects" prefetch={true}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-lg border mb-8">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            priority={true}
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {project.fullDescription ? formatContent(project.fullDescription) : null}
        </div>
      </article>
    </ContentContainer>
  )
}
