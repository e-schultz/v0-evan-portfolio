import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByCategory, getAllCategories } from "@/lib/content-api"

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

export default async function CategoryPage({ params }: { params: { category: string } }) {
  // Await params before accessing its properties
  const resolvedParams = await params
  const decodedCategory = decodeURIComponent(resolvedParams.category)
  // Use direct server function instead of API route
  const posts = await getPostsByCategory(decodedCategory)

  return (
    <MainLayout>
      <PageHeader
        title={`Category: ${decodedCategory}`}
        description={`Browse all articles in the ${decodedCategory} category`}
      />

      <section className="py-12">
        <ContentContainer>
          {posts.length > 0 ? (
            <BlogPostGrid posts={posts} columns={3} />
          ) : (
            <NoResults
              title="No posts found"
              message={`There are no posts in the ${decodedCategory} category yet.`}
              actionText="Back to all posts"
              actionLink="/blog"
            />
          )}
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
