import type { AboutContent } from "@/lib/content-types"
import Image from "next/image"

interface AboutSectionProps {
  aboutContent: AboutContent
}

export function AboutSection({ aboutContent }: AboutSectionProps) {
  if (!aboutContent) {
    return <div>Loading about content...</div>
  }

  return (
    <section className="py-16 md:py-24 bg-background" id="about">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{aboutContent.title}</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">{aboutContent.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            {aboutContent.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold">{section.title}</h3>
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

            <a
              href={aboutContent.resumeButton.url}
              className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="View Full Resume"
            >
              {aboutContent.resumeButton.text}
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
          </div>

          {aboutContent.image && (
            <div className="relative w-full h-[300px] md:w-[300px] md:h-[300px] overflow-hidden rounded-full mx-auto shadow-lg transition-all duration-500 hover:shadow-xl">
              <Image
                src={aboutContent.image || "/placeholder.svg"}
                alt={aboutContent.name || "Profile image"}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority={true}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-0">
            <div className="space-y-4">
              {aboutContent.experience.slice(0, 2).map((exp, index) => (
                <div key={index} className="bg-muted p-4 sm:p-6 rounded-lg hover:shadow-md transition-all duration-300">
                  <h4 className="font-bold mb-2">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-4 sm:mt-8">
              {aboutContent.experience.slice(2).map((exp, index) => (
                <div key={index} className="bg-muted p-4 sm:p-6 rounded-lg hover:shadow-md transition-all duration-300">
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
