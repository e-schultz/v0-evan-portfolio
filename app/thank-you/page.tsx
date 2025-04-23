import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Thank You | Evan Schultz",
  description: "Your message has been sent successfully.",
}

export default function ThankYouPage() {
  return (
    <>
      <PageHeader
        title="Thank You!"
        description="Your message has been sent successfully. I'll get back to you soon."
      />

      <section className="py-12">
        <ContentContainer maxWidth="md" className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <p className="text-lg mb-8">
            I appreciate you taking the time to reach out. I'll review your message and respond as soon as possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
              </Link>
            </Button>

            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}
