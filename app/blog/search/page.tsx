import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { searchPosts } from "@/lib/content-api"
import { BlogSearch } from "@/components/blog/blog-search"
import type { Metadata } from "next"

// Define proper types for the search params
type SearchPageProps = {
  searchParams: { q?: string }
}

export const metadata: Metadata = {
  title: "Search | Blog | Evan Schultz",
  description: "Search for articles on the blog",
}

export default async function Page({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const posts = query ? await searchPosts(query) : []

  return (
    <MainLayout>
      <PageHeader title="Search Results" description={query ? `Showing results for "${query}"` : "Search for articles"}>
        <div className="mt-8 max-w-md mx-auto">
          <BlogSearch initialQuery={query} />
        </div>
      </PageHeader>

      <section className="py-12">
        <ContentContainer>
          {query ? (
            posts.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Found {posts.length} results for "{query}"
                </h2>
                <BlogPostGrid posts={posts} columns={3} showCategory={true} />
              </>
            ) : (
              <NoResults
                title="No results found"
                message={`No articles match your search for "${query}".`}
                actionText="Browse all articles"
                actionLink="/blog"
              />
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Enter a search term above to find articles.</p>
            </div>
          )}
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
