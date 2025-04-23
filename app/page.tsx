import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogPreview } from "@/components/blog-preview"
import { ContactSection } from "@/components/contact-section"
import { getHeroContent, getAboutContent, getFeaturedProjects, getLatestBlogPosts } from "@/lib/content-api"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Home() {
  return (
    <>
      <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load hero section</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSectionContent />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load about section</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSectionContent />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load projects section</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectsSectionContent />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load blog preview</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <BlogPreviewContent />
        </Suspense>
      </ErrorBoundary>

      <ContactSection />
    </>
  )
}

// Separate async components for each section
async function HeroSectionContent() {
  const heroContent = await getHeroContent()
  return <HeroSection heroContent={heroContent} />
}

async function AboutSectionContent() {
  const aboutContent = await getAboutContent()
  return <AboutSection aboutContent={aboutContent} />
}

async function ProjectsSectionContent() {
  const projects = await getFeaturedProjects()
  return <ProjectsSection projects={projects} />
}

async function BlogPreviewContent() {
  const posts = await getLatestBlogPosts(3)
  return <BlogPreview posts={posts} />
}
