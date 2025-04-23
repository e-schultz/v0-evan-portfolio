import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { ContentContainer } from '@/components/ui/content-container'
import { SectionHeader } from '@/components/ui/section-header'
import { ProjectGrid } from '@/components/projects/project-grid'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github } from 'lucide-react'
import { getAllProjects } from '@/lib/content-api'
import { Suspense } from 'react'
import { ProjectCardSkeleton } from '@/components/skeletons/project-card-skeleton'
import { EnhancedErrorBoundary } from '@/components/enhanced-error-boundary'
import { ContentErrorFallback } from '@/components/error-fallbacks/content-error-fallback'

// Create separate components for featured and other projects
async function FeaturedProjects() {
  const projects = await getAllProjects()
  const featuredProjects = projects.filter((project) => project.featured)

  return <ProjectGrid projects={featuredProjects} columns={3} featured={true} />
}

async function OtherProjects() {
  const projects = await getAllProjects()
  const otherProjects = projects.filter((project) => !project.featured)

  return <ProjectGrid projects={otherProjects} columns={3} />
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="A collection of my work, including open source contributions, experiments, and educational resources."
      />

      {/* Featured Projects */}
      <section className="py-16 md:py-20">
        <ContentContainer>
          <SectionHeader title="Featured Projects" className="mb-8 md:mb-10" />
          <EnhancedErrorBoundary
            fallback={
              <ContentErrorFallback
                title="Failed to Load Featured Projects"
                message="We're having trouble loading the featured projects. Please try again later."
              />
            }
          >
            <Suspense fallback={<ProjectCardSkeleton count={3} />}>
              <FeaturedProjects />
            </Suspense>
          </EnhancedErrorBoundary>
        </ContentContainer>
      </section>

      {/* Other Projects */}
      <section className="py-16 md:py-20 bg-muted/50">
        <ContentContainer>
          <SectionHeader title="More Projects" className="mb-8 md:mb-10" />
          <EnhancedErrorBoundary
            fallback={
              <ContentErrorFallback
                title="Failed to Load Projects"
                message="We're having trouble loading the projects. Please try again later."
              />
            }
          >
            <Suspense fallback={<ProjectCardSkeleton count={6} />}>
              <OtherProjects />
            </Suspense>
          </EnhancedErrorBoundary>
        </ContentContainer>
      </section>

      {/* Open Source Contributions */}
      <section className="py-16 md:py-20">
        <ContentContainer>
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              Open Source Contributions
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10">
              I'm passionate about contributing to open source projects and giving back to the
              developer community. Check out my GitHub profile to see more of my work.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto group">
              <Link href="https://github.com/e-schultz" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View GitHub Profile{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}
