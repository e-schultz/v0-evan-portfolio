import Link from "next/link"
import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectGrid } from "@/components/projects/project-grid"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getAllProjects } from "@/lib/content-api"

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <MainLayout>
      <PageHeader
        title="Projects"
        description="A collection of my work, including open source contributions, experiments, and educational resources."
      />

      {/* Featured Projects */}
      <section className="py-16">
        <ContentContainer>
          <SectionHeader title="Featured Projects" />
          <ProjectGrid projects={featuredProjects} columns={3} featured={true} />
        </ContentContainer>
      </section>

      {/* Other Projects */}
      <section className="py-16 bg-muted/30">
        <ContentContainer>
          <SectionHeader title="More Projects" />
          <ProjectGrid projects={otherProjects} columns={3} />
        </ContentContainer>
      </section>

      {/* Open Source Contributions */}
      <section className="py-16">
        <ContentContainer>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Open Source Contributions</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm passionate about contributing to open source projects and giving back to the developer community.
              Check out my GitHub profile to see more of my work.
            </p>
            <Button asChild size="lg">
              <Link href="https://github.com/e-schultz" target="_blank" rel="noopener noreferrer">
                View GitHub Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
