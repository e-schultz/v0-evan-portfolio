import Link from "next/link"
import Image from "next/image"
import { getProject, getAllContentSlugs } from "@/lib/content-api"
import { ContentContainer } from "@/components/ui/content-container"
import { ContentError } from "@/components/content-error"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Project } from "@/lib/content-types"

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await getAllContentSlugs("project")
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for the page
export async function generateMetadata({ params }: any) {
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
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

// The page component
export default async function Page({ params }: any) {
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
          <ProjectContent project={project} />
        </div>
      </article>
    </ContentContainer>
  )
}

// Simple server component to render the project content
function ProjectContent({ project }: { project: Project }) {
  if (!project.fullDescription || project.fullDescription.length === 0) {
    return null
  }

  return (
    <>
      {project.fullDescription.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                {block.content}
              </h2>
            ) : (
              <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                {block.content}
              </h3>
            )
          case "paragraph":
            return (
              <p key={index} className="my-4">
                {block.content}
              </p>
            )
          case "list":
            return (
              <ul key={index} className="my-4 space-y-2 list-disc pl-5">
                {block.items?.map((item: any, itemIndex: number) => {
                  if (typeof item === "string") {
                    return (
                      <li key={itemIndex} className="text-muted-foreground">
                        {item}
                      </li>
                    )
                  } else if (item.type === "listItem") {
                    return (
                      <li key={itemIndex} className="text-muted-foreground">
                        {item.title && <strong>{item.title}</strong>}
                        {item.title && item.content && " - "}
                        {item.content}
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            )
          default:
            return null
        }
      })}
    </>
  )
}
