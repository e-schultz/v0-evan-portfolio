import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { getAllBlogPosts, getAllTags } from "@/lib/content-api"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { ContentErrorFallback } from "@/components/error-fallbacks/content-error-fallback"
import { AsyncBlogListWrapper } from "@/components/async/async-blog-list"
import { AsyncBlogSidebarWrapper } from "@/components/async/async-blog-sidebar"

export const metadata = {
  title: "Blog | Evan Schultz",
  description: "Thoughts, tutorials, and insights on web development, team leadership, and technology.",
}

export default function BlogPage() {
  // Create promises that will be resolved in the client components
  const postsPromise = getAllBlogPosts()
  const tagsPromise = getAllTags()

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
                  <ContentErrorFallback
                    title="Sidebar Error"
                    message="We encountered an error loading the blog sidebar."
                  />
                }
              >
                <AsyncBlogSidebarWrapper postsPromise={postsPromise} tagsPromise={tagsPromise} />
              </EnhancedErrorBoundary>
            </div>

            {/* Blog Posts */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-8">
              <EnhancedErrorBoundary
                fallback={
                  <ContentErrorFallback
                    title="Blog Posts Error"
                    message="We encountered an error loading the blog posts. Please try again later."
                  />
                }
              >
                <div className="sm:hidden">
                  <AsyncBlogListWrapper blogPostsPromise={postsPromise} columns={1} showCategory={true} />
                </div>
                <div className="hidden sm:block">
                  <AsyncBlogListWrapper blogPostsPromise={postsPromise} columns={2} showCategory={true} />
                </div>
              </EnhancedErrorBoundary>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}
