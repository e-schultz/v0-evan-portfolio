import { Suspense } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectGrid } from "@/components/projects/project-grid"
import { ArrowRight, Github } from "lucide-react"
import { getAllProjects } from "@/lib/content-api"
import { ErrorBoundary } from "@/components/error-boundary"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="A collection of my work, including open source contributions, experiments, and educational resources."
      />

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load projects</div>}>
        <Suspense fallback={<ProjectsPageSkeleton />}>
          <ProjectsContent />
        </Suspense>
      </ErrorBoundary>

      {/* Open Source Contributions */}
      <section className="py-16 md:py-20">
        <ContentContainer>
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Open Source Contributions</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10">
              I'm passionate about contributing to open source projects and giving back to the developer community.
              Check out my GitHub profile to see more of my work.
            </p>
            <Link
              href="https://github.com/e-schultz"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Github className="mr-2 h-5 w-5" /> View GitHub Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}

function ProjectsPageSkeleton() {
  return (
    <>
      {/* Featured Projects Skeleton */}
      <section className="py-16 md:py-20">
        <ContentContainer>
          <SectionHeader title="Featured Projects" className="mb-8 md:mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted rounded-md w-3/4"></div>
                  <div className="h-4 bg-muted rounded-md w-full"></div>
                  <div className="h-4 bg-muted rounded-md w-2/3"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-muted rounded-md w-24"></div>
                    <div className="h-8 bg-muted rounded-md w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Other Projects Skeleton */}
      <section className="py-16 md:py-20 bg-muted/50">
        <ContentContainer>
          <SectionHeader title="More Projects" className="mb-8 md:mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted rounded-md w-3/4"></div>
                  <div className="h-4 bg-muted rounded-md w-full"></div>
                  <div className="h-4 bg-muted rounded-md w-2/3"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-muted rounded-md w-24"></div>
                    <div className="h-8 bg-muted rounded-md w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>
    </>
  )
}

// Combined async component for projects to reduce duplicate data fetching
async function ProjectsContent() {
  const allProjects = await getAllProjects()
  const featuredProjects = allProjects.filter((project) => project.featured)
  const otherProjects = allProjects.filter((project) => !project.featured)

  return (
    <>
      {/* Featured Projects */}
      <section className="py-16 md:py-20">
        <ContentContainer>
          <SectionHeader title="Featured Projects" className="mb-8 md:mb-10" />
          <ProjectGrid projects={featuredProjects} columns={3} featured={true} />
        </ContentContainer>
      </section>

      {/* Other Projects */}
      <section className="py-16 md:py-20 bg-muted/50">
        <ContentContainer>
          <SectionHeader title="More Projects" className="mb-8 md:mb-10" />
          <ProjectGrid projects={otherProjects} columns={3} />
        </ContentContainer>
      </section>
    </>
  )
}
