import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { ContactForm } from "@/components/contact-form"
import { Mail, MessageSquare } from "lucide-react"
import { SocialLinks } from "@/components/ui/social-links"
import { getGenericContent } from "@/lib/content-api"
import { ContentError } from "@/components/content-error"

export default async function ContactPage() {
  try {
    const contactContent = await getGenericContent("pages/contact")

    // If content is missing, provide default values
    if (!contactContent) {
      return (
        <MainLayout>
          <ContentContainer>
            <div className="py-12">
              <ContentError
                title="Contact Information Unavailable"
                message="We're having trouble loading the contact information. Please try again later."
                backLink="/"
                backText="Back to Home"
              />
            </div>
          </ContentContainer>
        </MainLayout>
      )
    }

    // Default values for missing content sections
    const title = contactContent.title || "Get In Touch"
    const description =
      contactContent.description || "Have a question or want to work together? Feel free to reach out!"

    // Default email section
    const email = contactContent.email || {
      title: "Email",
      address: "evan@schultz.codes",
    }

    // Default social section with empty platforms if missing
    const social = contactContent.social || {
      title: "Social Media",
      platforms: [],
    }

    // Ensure platforms is an array and map to the expected format
    const platforms = Array.isArray(social?.platforms)
      ? social.platforms.map((platform) => ({
          platform: platform?.icon || platform?.name || "external",
          url: platform?.url || "#",
          label: platform?.name || "Social link",
        }))
      : []

    // Default image
    const image = contactContent.image || {
      src: "/hands-reaching.png",
      alt: "Contact image",
      caption: "Get in touch",
      description: "Ready to connect",
    }

    return (
      <MainLayout>
        <PageHeader title={title} description={description} />

        <section className="py-16">
          <ContentContainer>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{email.title}</h3>
                    <p className="text-muted-foreground">
                      <a href={`mailto:${email.address}`} className="hover:text-primary">
                        {email.address}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{social.title}</h3>
                    <div className="space-y-2">
                      {platforms.length > 0 ? (
                        <SocialLinks links={platforms} size="sm" />
                      ) : (
                        <p className="text-muted-foreground">Connect with me on social media.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg border aspect-square md:aspect-auto md:h-[400px]">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt || "Contact image"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{image.caption || "Get in touch"}</h3>
                      <p className="text-white/80">{image.description || "Ready to connect"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm formContent={contactContent.form} />
              </div>
            </div>
          </ContentContainer>
        </section>
      </MainLayout>
    )
  } catch (error) {
    console.error("Error rendering contact page:", error)
    return (
      <MainLayout>
        <ContentContainer>
          <div className="py-12">
            <ContentError
              title="Contact Page Error"
              message="We're having trouble loading the contact page. Please try again later."
              backLink="/"
              backText="Back to Home"
            />
          </div>
        </ContentContainer>
      </MainLayout>
    )
  }
}
