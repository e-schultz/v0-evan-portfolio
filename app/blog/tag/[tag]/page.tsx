import { Suspense } from "react"

import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { ErrorBoundary } from "@/components/error-boundary"
import { getPostsByTag } from "@/lib/content-api"

async function TagContent({ params }: { params: { tag: string } }) {
  // Ensure we're using the latest tag parameter
  const resolvedParams = await params
  const decodedTag = decodeURIComponent(resolvedParams.tag)

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

export default function TagPage({ params }: { params: { tag: string } }) {
  return (
    <MainLayout>
      <PageHeader
        title={`Tag: ${decodeURIComponent(params.tag)}`}
        description={`Browse all articles tagged with ${decodeURIComponent(params.tag)}`}
      />

      <section className="py-12">
        <ContentContainer>
          <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load tagged posts</div>}>
            <Suspense key={`tag-${params.tag}`} fallback={<BlogListSkeleton count={6} />}>
              <TagContent params={params} />
            </Suspense>
          </ErrorBoundary>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
