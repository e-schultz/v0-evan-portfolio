import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByTag, getAllTags } from "@/lib/content-api"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"

// Define the correct type for the page props
type TagPageProps = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  try {
    // Use direct server function instead of API route
    const tags = await getAllTags()
    return tags.map((tag) => ({ tag: tag.toLowerCase() }))
  } catch (error) {
    console.error("Error generating static params for tags:", error)
    return []
  }
}

export default function TagPage({ params }: TagPageProps) {
  return (
    <MainLayout>
      <PageHeader
        title={`Tag: ${decodeURIComponent(params.tag)}`}
        description={`Browse all articles tagged with ${decodeURIComponent(params.tag)}`}
      />

      <section className="py-12">
        <ContentContainer>
          <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load tagged posts</div>}>
            <Suspense fallback={<BlogListSkeleton count={6} />}>
              <TagContent params={params} />
            </Suspense>
          </ErrorBoundary>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}

// Separate async component for tag content
async function TagContent({ params }: { params: { tag: string } }) {
  // Await params before accessing its properties
  const decodedTag = decodeURIComponent(params.tag)
  // Use direct server function instead of API route
  const posts = await getPostsByTag(decodedTag)

  return posts.length > 0 ? (
    <BlogPostGrid posts={posts} columns={3} showCategory={true} />
  ) : (
    <NoResults
      title="No posts found"
      message={`There are no posts with the tag ${decodedTag} yet.`}
      actionText="Back to all posts"
      actionLink="/blog"
    />
  )
}
