import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByTag, getAllTags } from "@/lib/content-api"

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ tag: tag.toLowerCase() }))
}

// The page component
export default async function Page({ params }: any) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(tag)

  return (
    <MainLayout>
      <PageHeader title={`Tag: ${tag}`} description={`Browse all articles tagged with ${tag}`} />

      <section className="py-12">
        <ContentContainer>
          {posts.length > 0 ? (
            <BlogPostGrid posts={posts} columns={3} showCategory={true} />
          ) : (
            <NoResults
              title="No posts found"
              message={`There are no posts with the tag ${tag} yet.`}
              actionText="Back to all posts"
              actionLink="/blog"
            />
          )}
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
