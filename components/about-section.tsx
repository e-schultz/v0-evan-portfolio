import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getGenericContent } from "@/lib/content-api"
import type { AboutContent } from "@/lib/content-types"

export async function AboutSection() {
  const aboutContent = (await getGenericContent("home/about")) as AboutContent

  if (!aboutContent) {
    return <div>Loading about content...</div>
  }

  return (
    <section className="py-16 md:py-24 bg-background" id="about">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{aboutContent.title}</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl">{aboutContent.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {aboutContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-2xl font-bold">{section.title}</h3>
                {section.content &&
                  section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                {section.items && (
                  <ul className="space-y-2 text-muted-foreground">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Button asChild>
              <Link href={aboutContent.resumeButton.url}>
                {aboutContent.resumeButton.text} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {aboutContent.experience.slice(0, 2).map((exp, index) => (
                <div key={index} className="bg-muted p-6 rounded-lg">
                  <h4 className="font-bold mb-2">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-8">
              {aboutContent.experience.slice(2).map((exp, index) => (
                <div key={index} className="bg-muted p-6 rounded-lg">
                  <h4 className="font-bold mb-2">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
