import { Suspense } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"
import { ErrorBoundary } from "@/components/error-boundary"
import { getPostsByCategory } from "@/lib/content-api"

async function CategoryContent({ params }: { params: { category: string } }) {
  // Ensure we're using the latest category parameter
  const resolvedParams = await params
  const decodedCategory = decodeURIComponent(resolvedParams.category)

  // Use direct server function instead of API route
  const posts = await getPostsByCategory(decodedCategory)

  return posts.length > 0 ? (
    <BlogPostGrid posts={posts} columns={3} />
  ) : (
    <NoResults
      title="No posts found"
      message={`There are no posts in the ${decodedCategory} category yet.`}
      actionText="Back to all posts"
      actionLink="/blog"
    />
  )
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <MainLayout>
      <PageHeader
        title={`Category: ${decodeURIComponent(params.category)}`}
        description={`Browse all articles in the ${decodeURIComponent(params.category)} category`}
      />

      <section className="py-12">
        <ContentContainer>
          <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load category posts</div>}>
            <Suspense key={`category-${params.category}`} fallback={<BlogListSkeleton count={6} />}>
              <CategoryContent params={params} />
            </Suspense>
          </ErrorBoundary>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
