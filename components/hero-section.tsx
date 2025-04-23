import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
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
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={heroContent.primaryButton.url}>
                  {heroContent.primaryButton.text} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href={heroContent.secondaryButton.url}>{heroContent.secondaryButton.text}</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {heroContent.socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  {getSocialIcon(link.platform)}
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          {heroContent.image && (
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
              <Image
                src={heroContent.image || "/placeholder.svg"}
                alt={heroContent.title || "Hero image"}
                fill
                sizes="100vw"
                className="object-cover"
                priority={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
