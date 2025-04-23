import Link from "next/link"
import Image from "next/image"
import { getProject, getAllContentSlugs } from "@/lib/content-api"
import { ContentContainer } from "@/components/ui/content-container"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { renderContentBlocks } from "@/lib/format-content"
import type { Metadata } from "next"

// Define proper types for the params
type PageParams = {
  params: {
    slug: string
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await getAllContentSlugs("project")
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
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
      type: "article",
      images: [
        {
          url: project.image || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

// The page component
export default async function Page({ params }: PageParams) {
  const project = await getProject(params.slug)

  if (!project) {
    return (
      <ContentContainer>
        <div className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, the project you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/projects">Browse All Projects</Link>
            </Button>
          </div>
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
          {project.fullDescription && renderContentBlocks(project.fullDescription)}
        </div>
      </article>
    </ContentContainer>
  )
}
