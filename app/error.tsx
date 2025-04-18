"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { MainLayout } from "@/components/layouts/main-layout"
import { ContentContainer } from "@/components/ui/content-container"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          <ContentContainer className="py-12">
            <ErrorBoundary error={error} reset={reset} />
          </ContentContainer>
        </MainLayout>
      </body>
    </html>
  )
}
