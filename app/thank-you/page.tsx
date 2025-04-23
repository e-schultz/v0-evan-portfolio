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
      <PageHeader title="Thank You!" description="Your message has been sent successfully." />

      <section className="py-12">
        <ContentContainer maxWidth="md" className="text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-blue-600/10 p-6 rounded-full">
              <CheckCircle className="h-16 w-16 text-blue-600" />
            </div>

            <div className="space-y-4 max-w-lg">
              <h2 className="text-2xl font-bold">Message Received</h2>
              <p className="text-muted-foreground">
                I'll review your message and get back to you as soon as possible. Thank you for reaching out!
              </p>
            </div>

            <div className="pt-6">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}
