import { MainLayout } from "@/components/layouts/main-layout"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
// import { ProjectsSection } from "@/components/projects-section"
// import { BlogPreview } from "@/components/blog-preview"
import { ContactSection } from "@/components/contact-section"
import { getGenericContent } from "@/lib/content-api"
import type { HeroContent, AboutContent } from "@/lib/content-types"

export default async function Home() {
  let heroContent: HeroContent | null = null
  let aboutContent: AboutContent | null = null

  try {
    // Pre-fetch hero content
    heroContent = (await getGenericContent("home/hero")) as HeroContent
  } catch (error) {
    console.error("Error loading hero content:", error)
    // Provide fallback content
    heroContent = {
      title: "Evan Schultz",
      subtitle: "Web Developer & Designer",
      description: "Building modern web applications with React, Next.js, and more.",
      primaryButton: { text: "View Projects", url: "/projects" },
      secondaryButton: { text: "Contact Me", url: "/contact" },
      socialLinks: [],
    }
  }

  try {
    // Pre-fetch about content
    aboutContent = (await getGenericContent("home/about")) as AboutContent
  } catch (error) {
    console.error("Error loading about content:", error)
    // Provide fallback content
    aboutContent = {
      title: "About Me",
      description: "Web developer with experience in modern frameworks.",
      sections: [],
      resumeButton: { text: "View Resume", url: "/resume" },
      experience: [],
    }
  }

  return (
    <MainLayout>
      {heroContent && <HeroSection heroContent={heroContent} />}
      {aboutContent && <AboutSection aboutContent={aboutContent} />}
      {/* Temporarily removed ProjectsSection and BlogPreview */}
      <ContactSection />
    </MainLayout>
  )
}
