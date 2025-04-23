import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <ContentContainer className="py-12">
      <PageHeader
        title="Thank You!"
        description="Your message has been sent successfully. I'll get back to you soon."
      />
      <div className="text-center">
        <Link href="/">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Back to Home</Button>
        </Link>
      </div>
    </ContentContainer>
  )
}
