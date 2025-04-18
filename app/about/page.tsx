import Link from "next/link"
import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Briefcase, GraduationCap, Mic, User, ArrowRight } from "lucide-react"
import { getGenericContent } from "@/lib/content-api"

export default async function AboutPage() {
  const aboutContent = await getGenericContent("pages/about")

  if (!aboutContent) {
    return <div>Loading about content...</div>
  }

  return (
    <MainLayout>
      <PageHeader title={aboutContent.title} description={aboutContent.subtitle} />

      {/* Hero Section with Image */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <ContentContainer>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{aboutContent.description}</h2>
              {aboutContent.introduction.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative rounded-lg overflow-hidden border border-primary/10">
              <img
                src={aboutContent.image.src || "/placeholder.svg"}
                alt={aboutContent.image.alt}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <p className="text-sm font-medium text-primary">{aboutContent.image.caption}</p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-muted/30">
        <ContentContainer maxWidth="3xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">{aboutContent.philosophy.title}</h2>
            {aboutContent.philosophy.content.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Professional Journey */}
      <section className="py-16">
        <ContentContainer maxWidth="4xl">
          <SectionHeader title={aboutContent.journey.title} centered />
          <div className="space-y-12">
            {aboutContent.journey.milestones.map((milestone, index) => (
              <div key={index} className="relative pl-10 border-l border-primary/20">
                <div className="absolute left-0 top-0 -translate-x-1/2 bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {milestone.period}
                  </div>
                  <h3 className="text-xl font-bold">{milestone.role}</h3>
                  <p className="font-medium text-primary">{milestone.company}</p>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted/30">
        <ContentContainer>
          <SectionHeader title={aboutContent.skills.title} centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.skills.categories.map((category, index) => (
              <Card key={index} className="overflow-hidden border-primary/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{category.name}</h3>
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
      <section className="py-16">
        <ContentContainer maxWidth="3xl">
          <SectionHeader title={aboutContent.education.title} centered />
          <div className="space-y-8">
            {aboutContent.education.degrees.map((degree, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
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
                  <h3 className="text-xl font-bold">{cert.name}</h3>
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
      <section className="py-16 bg-muted/30">
        <ContentContainer maxWidth="3xl">
          <SectionHeader title={aboutContent.speaking.title} centered />
          <p className="text-muted-foreground text-center mb-10">{aboutContent.speaking.content}</p>
          <div className="space-y-6">
            {aboutContent.speaking.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-background border">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{highlight.event}</p>
                  <div className="flex space-x-3">
                    {highlight.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
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
      <section className="py-16">
        <ContentContainer maxWidth="3xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">{aboutContent.personal.title}</h2>
            <p className="text-muted-foreground">{aboutContent.personal.content}</p>
          </div>
        </ContentContainer>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <ContentContainer maxWidth="3xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">{aboutContent.cta.title}</h2>
            <p className="text-muted-foreground">{aboutContent.cta.content}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {aboutContent.cta.buttons.map((button, index) => (
                <Button key={index} variant={button.variant as any} asChild>
                  <Link href={button.url}>
                    {button.text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
