import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { ButtonShowcase } from "@/components/ui/button-showcase"

export const metadata = {
  title: "UI Showcase | Evan Schultz",
  description: "A showcase of UI components used in the portfolio",
}

export default function UIShowcasePage() {
  return (
    <MainLayout>
      <PageHeader title="UI Component Showcase" description="A collection of UI components used throughout the site" />

      <section className="py-12">
        <ContentContainer maxWidth="3xl">
          <h2 className="text-2xl font-bold mb-6">Button Variants</h2>
          <p className="text-muted-foreground mb-8">
            Explore the various button styles and interactive effects available in the design system.
          </p>

          <ButtonShowcase />
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
