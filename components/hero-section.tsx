import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import type { HeroContent } from "@/lib/content-types"
import Image from "next/image"

interface HeroSectionProps {
  heroContent: HeroContent
}

export function HeroSection({ heroContent }: HeroSectionProps) {
  if (!heroContent) {
    return <div>Loading hero content...</div>
  }

  // Map platform names to their respective icons
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="h-6 w-6" />
      case "linkedin":
        return <Linkedin className="h-6 w-6" />
      case "twitter":
        return <Twitter className="h-6 w-6" />
      default:
        return null
    }
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              {heroContent.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">{heroContent.subtitle}</p>
            <p className="text-base md:text-lg text-muted-foreground max-w-md">{heroContent.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={heroContent.primaryButton.url}
                className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="View Projects Page"
              >
                {heroContent.primaryButton.text}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-2 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href={heroContent.secondaryButton.url}
                className="inline-flex items-center justify-center px-8 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm font-medium w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Contact Me Page"
              >
                {heroContent.secondaryButton.text}
              </a>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {heroContent.socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
                >
                  {getSocialIcon(link.platform)}
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          {heroContent.image && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl">
              <Image
                src={heroContent.image || "/placeholder.svg"}
                alt={heroContent.title || "Hero image"}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
