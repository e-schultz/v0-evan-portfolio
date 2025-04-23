import { MainLayout } from '@/components/layouts/main-layout'
import { PageHeader } from '@/components/ui/page-header'
import { ContentContainer } from '@/components/ui/content-container'
import { BlogSearchClient } from '@/components/blog/blog-search-client'
import { searchPosts } from '@/lib/content-api'

// This is now a Server Component
export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ''

  // Fetch initial results on the server
  const initialResults = query ? await searchPosts(query) : []

  return (
    <MainLayout>
      <PageHeader
        title="Search Results"
        description={query ? `Showing results for "${query}"` : 'Search for articles'}
      >
        <div className="mt-8">
          <BlogSearchClient initialQuery={query} />
        </div>
      </PageHeader>

      <section className="py-12">
        <ContentContainer>
          <BlogSearchClient
            initialQuery={query}
            initialResults={initialResults}
            showResults={true}
          />
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
