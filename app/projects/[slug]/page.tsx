import { getProject } from "@/lib/content-api"
import { ContentContainer } from "@/components/ui/content-container"
import { ContentError } from "@/components/content-error"
import { formatContent } from "@/lib/format-content"

export async function generateMetadata({ params }: { params: { slug: string } }) {
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

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

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
    <div className="container py-8 px-4 md:px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-lg border mb-8">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">{formatContent(project.content)}</div>
      </article>
    </div>
  )
}
