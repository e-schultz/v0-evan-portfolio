import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByCategory, getAllCategories } from "@/lib/content-api"

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ category: category.toLowerCase() }))
}

// The page component
export default async function Page({ params }: any) {
  const category = decodeURIComponent(params.category)
  const posts = await getPostsByCategory(category)

  return (
    <MainLayout>
      <PageHeader title={`Category: ${category}`} description={`Browse all articles in the ${category} category`} />

      <section className="py-12">
        <ContentContainer>
          {posts.length > 0 ? (
            <BlogPostGrid posts={posts} columns={3} />
          ) : (
            <NoResults
              title="No posts found"
              message={`There are no posts in the ${category} category yet.`}
              actionText="Back to all posts"
              actionLink="/blog"
            />
          )}
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
