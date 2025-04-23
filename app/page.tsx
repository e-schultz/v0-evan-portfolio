import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogPreview } from "@/components/blog-preview"
import { ContactSection } from "@/components/contact-section"
import { getGenericContent, getFeaturedProjects, getLatestBlogPosts } from "@/lib/content-api"
import type { HeroContent, AboutContent } from "@/lib/content-types"

export default async function Home() {
  // Pre-fetch all data
  const heroContent = (await getGenericContent("home/hero")) as HeroContent
  const aboutContent = (await getGenericContent("home/about")) as AboutContent
  const featuredProjects = await getFeaturedProjects()
  const latestPosts = await getLatestBlogPosts(3)

  return (
    <>
      <HeroSection heroContent={heroContent} />
      <AboutSection aboutContent={aboutContent} />
      <ProjectsSection projects={featuredProjects} />
      <BlogPreview posts={latestPosts} />
      <ContactSection />
    </>
  )
}
