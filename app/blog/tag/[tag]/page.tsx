import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { getPostsByTag, getAllTags } from "@/lib/content-api"
import type { Metadata } from "next"

// Define proper types for the params
type PageParams = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ tag: tag.toLowerCase() }))
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag} | Blog Tags | Evan Schultz`,
    description: `Browse all articles tagged with ${tag}`,
  }
}

export default async function Page({ params }: PageParams) {
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
