import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogPreview } from "@/components/blog-preview"
import { ContactSection } from "@/components/contact-section"
import { getHeroContent, getAboutContent, getFeaturedProjects, getLatestBlogPosts } from "@/lib/content-api"

export default async function Home() {
  // Fetch all data in parallel
  const [heroContent, aboutContent, projects, posts] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getFeaturedProjects(),
    getLatestBlogPosts(3),
  ])

  return (
    <>
      <HeroSection heroContent={heroContent} />
      <AboutSection aboutContent={aboutContent} />
      <ProjectsSection projects={projects} />
      <BlogPreview posts={posts} />
      <ContactSection />
    </>
  )
}
