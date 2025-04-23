import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { getAllBlogPosts, getAllTags } from "@/lib/content-api"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { ErrorFallback } from "@/components/error-fallback"
import { Suspense } from "react"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Blog | Evan Schultz",
  description: "Thoughts, tutorials, and insights on web development, team leadership, and technology.",
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Thoughts, tutorials, and insights on web development, team leadership, and technology."
      />

      <section className="py-12">
        <ContentContainer>
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - hidden on mobile, shown at bottom on tablet, normal position on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <EnhancedErrorBoundary
                fallback={
                  <ErrorFallback title="Sidebar Error" message="We encountered an error loading the blog sidebar." />
                }
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogSidebarContent />
                </Suspense>
              </EnhancedErrorBoundary>
            </div>

            {/* Blog Posts */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-8">
              <EnhancedErrorBoundary
                fallback={
                  <ErrorFallback
                    title="Blog Posts Error"
                    message="We encountered an error loading the blog posts. Please try again later."
                  />
                }
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogPostsContent />
                </Suspense>
              </EnhancedErrorBoundary>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}

// Separate async components for each section
async function BlogSidebarContent() {
  const tags = await getAllTags()
  const posts = await getAllBlogPosts()
  const recentPosts = posts.slice(0, 3)

  return <BlogSidebar tags={tags} recentPosts={recentPosts} />
}

async function BlogPostsContent() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <div className="sm:hidden">
        <BlogPostGrid posts={posts} columns={1} showCategory={true} />
      </div>
      <div className="hidden sm:block">
        <BlogPostGrid posts={posts} columns={2} showCategory={true} />
      </div>
    </>
  )
}
