import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogSearchClient } from "@/components/blog/blog-search-client"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { ContentErrorFallback } from "@/components/error-fallbacks/content-error-fallback"
import { SearchResults } from "@/components/search/search-results"

// This is a Server Component
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <MainLayout>
      <PageHeader title="Search Results" description={query ? `Showing results for "${query}"` : "Search for articles"}>
        <div className="mt-8">
          <BlogSearchClient initialQuery={query} />
        </div>
      </PageHeader>

      <section className="py-12">
        <ContentContainer>
          <EnhancedErrorBoundary
            fallback={
              <ContentErrorFallback
                title="Search Error"
                message="We encountered an error while searching. Please try again."
                backLink="/blog"
                backText="Back to Blog"
              />
            }
          >
            {query ? (
              <Suspense fallback={<LoadingSpinner size="large" />}>
                <SearchResults query={query} />
              </Suspense>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Enter a search term to find articles.</p>
              </div>
            )}
          </EnhancedErrorBoundary>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
