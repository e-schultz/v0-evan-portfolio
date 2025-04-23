import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByCategory, getAllCategories } from "@/lib/content-api"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"

// Define the correct type for the page props
type CategoryPageProps = {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  try {
    // Use direct server function instead of API route
    const categories = await getAllCategories()
    return categories.map((category) => ({ category: category.toLowerCase() }))
  } catch (error) {
    console.error("Error generating static params for categories:", error)
    return []
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <MainLayout>
      <PageHeader
        title={`Category: ${decodeURIComponent(params.category)}`}
        description={`Browse all articles in the ${decodeURIComponent(params.category)} category`}
      />

      <section className="py-12">
        <ContentContainer>
          <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load category posts</div>}>
            <Suspense fallback={<BlogListSkeleton count={6} />}>
              <CategoryContent params={params} />
            </Suspense>
          </ErrorBoundary>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}

// Separate async component for category content
async function CategoryContent({ params }: { params: { category: string } }) {
  // Await params before accessing its properties
  const decodedCategory = decodeURIComponent(params.category)
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
