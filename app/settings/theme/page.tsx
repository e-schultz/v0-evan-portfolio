import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { ThemeDocumentation } from "@/components/theme-documentation"

export const metadata = {
  title: "Theme Settings | Evan Schultz",
  description: "Customize the appearance of the portfolio site",
}

export default function ThemeSettingsPage() {
  return (
    <MainLayout>
      <PageHeader title="Theme Settings" description="Customize the appearance of the site to your preference" />

      <section className="py-12">
        <ContentContainer maxWidth="3xl">
          <ThemeDocumentation />
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
