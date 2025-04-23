import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByCategory, getAllCategories } from "@/lib/content-api"
import type { Metadata } from "next"

// Define proper types for the params
// Temporarily use any to bypass TypeScript error
type PageParams = {
  params: any // Changed from { category: string }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ category: category.toLowerCase() }))
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const category = decodeURIComponent(params.category)

  return {
    title: `${category} | Blog Categories | Evan Schultz`,
    description: `Browse all articles in the ${category} category`,
  }
}

export default async function Page({ params }: PageParams) {
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
