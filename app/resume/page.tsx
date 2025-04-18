"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import { SocialLinks } from "@/components/ui/social-links"

export default function ResumePage() {
  const socialLinks = [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/evanschultz1/",
      label: "LinkedIn",
    },
    {
      platform: "twitter",
      url: "http://twitter.com/e_p82",
      label: "Twitter",
    },
    {
      platform: "github",
      url: "https://github.com/e-schultz",
      label: "GitHub",
    },
  ]

  return (
    <MainLayout>
      <PageHeader title="Resume" description="My professional experience and qualifications">
        <div className="mt-6">
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </PageHeader>

      <section className="py-12">
        <ContentContainer maxWidth="4xl">
          {/* Header */}
          <div className="mb-12 pb-8 border-b">
            <h1 className="text-3xl font-bold mb-4">Evan Schultz</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Building high performing teams and the environment that enables them.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="mailto:evan@schultz.codes" className="hover:text-primary">
                  evan@schultz.codes
                </a>
              </div>
              <SocialLinks links={socialLinks} />
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Work Experience</h2>

            <div className="space-y-8">
              <div className="grid md:grid-cols-[200px_1fr] gap-4">
                <div>
                  <p className="font-medium">Oct 2021 - Nov 2022</p>
                  <p className="text-muted-foreground">Rangle.io</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Technical Director, Coach</h3>
                  <ul className="mt-2 space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Led technical direction and coaching for development teams</li>
                    <li>Mentored engineers and tech leads on career growth</li>
                    <li>Facilitated knowledge sharing and learning initiatives</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-4">
                <div>
                  <p className="font-medium">May 2020 - Apr 2021</p>
                  <p className="text-muted-foreground">PartnerStack</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Software Engineering Manager</h3>
                  <ul className="mt-2 space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Managed engineering teams and technical projects</li>
                    <li>Implemented development processes and best practices</li>
                    <li>Collaborated with product and design teams on feature development</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-4">
                <div>
                  <p className="font-medium">Oct 2019 - Mar 2020</p>
                  <p className="text-muted-foreground">Bridge School</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Director of Frontend Education</h3>
                  <ul className="mt-2 space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Ran operations of the front-end program</li>
                    <li>Created and updated curriculum for future cohorts</li>
                    <li>Developed exercises and homework assignments</li>
                    <li>Onboarded new mentors and instructors</li>
                    <li>Assessed solutions to technical challenges</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-4">
                <div>
                  <p className="font-medium">Sept 2014 - Mar 2020</p>
                  <p className="text-muted-foreground">Rangle</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Technical Director</h3>
                  <p className="mt-2 mb-4">
                    Served in multiple roles including manager, full-stack developer, consultant, and educator.
                  </p>

                  <h4 className="font-bold mb-2">Manager:</h4>
                  <ul className="mb-4 space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Managed engineers across different client accounts</li>
                    <li>Developed career growth plans with engineers and tech leads</li>
                    <li>Participated in coaching and mentoring initiatives</li>
                    <li>Conducted performance and compensation reviews</li>
                  </ul>

                  <h4 className="font-bold mb-2">Full-stack Developer and Consultant:</h4>
                  <ul className="mb-4 space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Identified opportunities and challenges on project teams</li>
                    <li>Worked with companies from startups to large enterprises</li>
                    <li>Influenced multi-year evolution of enterprise products</li>
                    <li>Collaborated with CTOs to identify technology trends</li>
                  </ul>

                  <h4 className="font-bold mb-2">Training & Education:</h4>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Contributed to Rangle's Angular Training book</li>
                    <li>Created and ran multi-day JavaScript/React workshops</li>
                    <li>Developed training materials for clients and internal use</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Articles & Presentations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Articles & Presentations</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Public Speaking / Presentations</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong>How to create "Vuetiful" Data-Driven User Interface @ JSCamp 2018</strong>
                    <div className="mt-1">
                      <a
                        href="http://bit.ly/vue-jscamp-2018"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Video
                      </a>{" "}
                      |
                      <a
                        href="http://bit.ly/vue-jscamp-2018-slides"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1"
                      >
                        Slides
                      </a>
                    </div>
                  </li>
                  <li>
                    <strong>Building Angular 2 Applications with Redux @ Angular Camp</strong>
                    <div className="mt-1">
                      <a
                        href="http://bit.ly/angular-camp-redux-video"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Video
                      </a>{" "}
                      |
                      <a
                        href="http://bit.ly/angular-camp-redux-slides"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1"
                      >
                        Slides
                      </a>
                    </div>
                  </li>
                  <li>
                    <strong>React Redux Analytics with Bertrand @ React Europe</strong>
                    <div className="mt-1">
                      <a
                        href="http://bit.ly/react-redux-analytics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Video
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Blog Posts</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <a
                      href="https://rangle.io/blog/refactor-to-react-hooks-not-classes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Refactor to Hooks, not Classes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rangle.io/blog/simplifying-controlled-inputs-with-hooks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Simplifying React Forms with Hooks
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rangle.io/blog/improving-your-mental-model-of-useeffect"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Improving Your Mental Model of useEffect
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rangle.io/blog/how-to-create-data-driven-user-interfaces-in-vue"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      How to Create Data-Driven User Interfaces with Vue
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rangle.io/blog/are-your-unit-tests-failing-for-the-expected-reasons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Are Your Unit Tests Failing for the Expected Reasons?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className="grid md:grid-cols-[200px_1fr] gap-4">
              <div>
                <p className="font-medium">Ryerson University</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Bachelor of Commerce, Information Technology Management</h3>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
