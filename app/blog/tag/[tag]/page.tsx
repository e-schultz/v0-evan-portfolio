import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByTag, getAllTags } from "@/lib/content-api"

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

export default async function TagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag)
  // Use direct server function instead of API route
  const posts = await getPostsByTag(decodedTag)

  return (
    <MainLayout>
      <PageHeader title={`Tag: ${decodedTag}`} description={`Browse all articles tagged with ${decodedTag}`} />

      <section className="py-12">
        <ContentContainer>
          {posts.length > 0 ? (
            <BlogPostGrid posts={posts} columns={3} showCategory={true} />
          ) : (
            <NoResults
              title="No posts found"
              message={`There are no posts with the tag ${decodedTag} yet.`}
              actionText="Back to all posts"
              actionLink="/blog"
            />
          )}
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
