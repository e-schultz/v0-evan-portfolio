import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import { getGenericContent } from "@/lib/content-api"
import type { HeroContent } from "@/lib/content-types"
import Image from "next/image"

export async function HeroSection() {
  const heroContent = (await getGenericContent("home/hero")) as HeroContent

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
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">{heroContent.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">{heroContent.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-md">{heroContent.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href={heroContent.primaryButton.url}>
                  {heroContent.primaryButton.text} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
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
          <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/50 mix-blend-multiply z-10"></div>
            {heroContent.image ? (
              <Image
                src={heroContent.image || "/placeholder.svg"}
                alt="Tech-inspired illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Image not available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
