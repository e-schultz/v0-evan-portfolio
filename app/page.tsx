import { MainLayout } from "@/components/layouts/main-layout"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogPreview } from "@/components/blog-preview"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogPreview />
      <ContactSection />
    </MainLayout>
  )
}
