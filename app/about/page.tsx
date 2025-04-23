import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { SectionHeader } from "@/components/ui/section-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Briefcase, GraduationCap, Mic, User, ArrowRight } from "lucide-react"
import { getGenericContent } from "@/lib/content-api"
import { ContentError } from "@/components/content-error"
import Link from "next/link"

export default async function AboutPage() {
  try {
    const aboutContent = await getGenericContent("pages/about")

    if (!aboutContent) {
      return (
        <ContentContainer>
          <div className="py-12">
            <ContentError
              title="About Content Unavailable"
              message="We're having trouble loading the about page content. Please try again later."
              backLink="/"
              backText="Back to Home"
            />
          </div>
        </ContentContainer>
      )
    }

    return (
      <>
        <PageHeader title={aboutContent.title} description={aboutContent.subtitle} />

        {/* Hero Section with Image */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-background">
          <ContentContainer className="px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">{aboutContent.description}</h2>
                {aboutContent.introduction.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative rounded-lg overflow-hidden border border-primary/10 transition-all duration-500 hover:shadow-xl">
                <img
                  src={aboutContent.image.src || "/placeholder.svg"}
                  alt={aboutContent.image.alt}
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <p className="text-sm font-medium text-primary">{aboutContent.image.caption}</p>
                </div>
              </div>
            </div>
          </ContentContainer>
        </section>

        {/* Philosophy Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <ContentContainer maxWidth="3xl" className="px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">{aboutContent.philosophy.title}</h2>
              {aboutContent.philosophy.content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </ContentContainer>
        </section>

        {/* Professional Journey */}
        <section className="py-12 md:py-16">
          <ContentContainer maxWidth="4xl" className="px-4 md:px-6">
            <SectionHeader title={aboutContent.journey.title} centered />
            <div className="space-y-8 md:space-y-12">
              {aboutContent.journey.milestones.map((milestone, index) => (
                <div key={index} className="relative pl-8 md:pl-10 border-l border-primary/20">
                  <div className="absolute left-0 top-0 -translate-x-1/2 bg-primary/10 p-2 rounded-full">
                    <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {milestone.period}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{milestone.role}</h3>
                    <p className="font-medium text-primary">{milestone.company}</p>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentContainer>
        </section>

        {/* Skills Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <ContentContainer className="px-4 md:px-6">
            <SectionHeader title={aboutContent.skills.title} centered />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {aboutContent.skills.categories.map((category, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-md"
                >
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-4">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ContentContainer>
        </section>

        {/* Education Section */}
        <section className="py-12 md:py-16">
          <ContentContainer maxWidth="3xl" className="px-4 md:px-6">
            <SectionHeader title={aboutContent.education.title} centered />
            <div className="space-y-6 md:space-y-8">
              {aboutContent.education.degrees.map((degree, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">
                      {degree.degree} in {degree.field}
                    </h3>
                    <p className="text-muted-foreground">
                      {degree.institution}, {degree.year}
                    </p>
                  </div>
                </div>
              ))}
              {aboutContent.education.certifications?.map((cert, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">{cert.name}</h3>
                    <p className="text-muted-foreground">
                      {cert.issuer}, {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ContentContainer>
        </section>

        {/* Speaking & Writing */}
        <section className="py-12 md:py-16 bg-muted/30">
          <ContentContainer maxWidth="3xl" className="px-4 md:px-6">
            <SectionHeader title={aboutContent.speaking.title} centered />
            <p className="text-muted-foreground text-center mb-8 md:mb-10">{aboutContent.speaking.content}</p>
            <div className="space-y-4 md:space-y-6">
              {aboutContent.speaking.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-background border transition-all duration-300 hover:shadow-md"
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{highlight.event}</p>
                    <div className="flex flex-wrap gap-3">
                      {highlight.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline transition-colors duration-200"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ContentContainer>
        </section>

        {/* Personal Section */}
        <section className="py-12 md:py-16">
          <ContentContainer maxWidth="3xl" className="px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">{aboutContent.personal.title}</h2>
              <p className="text-muted-foreground">{aboutContent.personal.content}</p>
            </div>
          </ContentContainer>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-muted">
          <ContentContainer maxWidth="3xl" className="px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">{aboutContent.cta.title}</h2>
              <p className="text-muted-foreground">{aboutContent.cta.content}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                {aboutContent.cta.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url}
                    target={button.url.startsWith("http") ? "_blank" : undefined}
                    rel={button.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-center px-8 py-3 rounded-md ${
                      button.variant === "default"
                        ? "bg-blue-600 text-white font-medium hover:bg-blue-700"
                        : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    } transition-all duration-200 hover:scale-105 active:scale-95 ${
                      button.variant === "default" ? "hover:shadow-md" : "hover:shadow-sm"
                    } w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                    aria-label={button.text}
                  >
                    {button.icon === "github" && (
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.776.418-1.304.762-1.604-.266-.809-.814-1.656-2.087-2.012 0 0-.671-2.158 1.52-2.158 0 0 .482-.149.793.609.291-.086.614-.144.928-.144.314 0 .637.058.928.144.311-.758.793-.609.793-.609 2.191.484 1.52 2.158 1.52 2.158 1.274.356 1.822 1.203 2.087 2.012.344.3.674.828.762 1.604.686-.694 2.425-1.224 3.495-.998 0 .015 1.205.084 1.838-.729 0 0-.787.369-1.333 1.756-.546 1.387-1.695 2.142-4.033 1.416 0 .319.22.69.82.577C20.562 22.197 24 17.6 24 12.297c0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {button.text}
                    {button.variant === "default" && (
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
                    )}
                    {button.variant !== "default" && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Link>
                ))}
              </div>
            </div>
          </ContentContainer>
        </section>
      </>
    )
  } catch (error) {
    console.error("Error rendering about page:", error)
    return (
      <ContentContainer>
        <div className="py-12">
          <ContentError
            title="About Page Error"
            message="We're having trouble loading the about page. Please try again later."
            backLink="/"
            backText="Back to Home"
          />
        </div>
      </ContentContainer>
    )
  }
}
