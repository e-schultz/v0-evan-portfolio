import { Suspense } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getAllBlogPosts, getAllTags } from "@/lib/content-api"
import { ErrorBoundary } from "@/components/error-boundary"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"

export const metadata = {
  title: "Blog | Evan Schultz",
  description: "Thoughts, tutorials, and insights on web development, team leadership, and technology.",
}

export default function BlogPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Blog"
        description="Thoughts, tutorials, and insights on web development, team leadership, and technology."
      />

      <section className="py-12">
        <ContentContainer>
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - hidden on mobile, shown at bottom on tablet, normal position on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load blog sidebar</div>}>
                <Suspense fallback={<SidebarSkeleton />}>
                  <BlogSidebarContent />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Blog Posts */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-8">
              <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load blog posts</div>}>
                <Suspense fallback={<BlogListSkeleton count={6} />}>
                  <BlogPostContent />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}

// Separate async component for blog posts
async function BlogPostContent() {
  const posts = await getAllBlogPosts()

  // Filter out duplicate blog posts by slug
  const uniquePosts = Array.from(new Map(posts.map((post) => [post.slug, post])).values())

  return (
    <>
      <BlogPostGrid posts={uniquePosts} columns={1} showCategory={true} className="sm:hidden" />
      <BlogPostGrid
        posts={uniquePosts}
        columns={2}
        showCategory={true}
        className="hidden sm:grid lg:grid-cols-2 xl:grid-cols-3"
      />
    </>
  )
}

// Separate async component for sidebar
async function BlogSidebarContent() {
  const allPosts = await getAllBlogPosts()
  const allTags = await getAllTags()

  // Filter out duplicate blog posts by slug
  const uniquePosts = Array.from(new Map(allPosts.map((post) => [post.slug, post])).values())

  return <BlogSidebar tags={allTags} recentPosts={uniquePosts.slice(0, 3)} />
}

// Skeleton loader for sidebar
function SidebarSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-6 bg-muted rounded w-24 mb-4"></div>
        <div className="h-10 bg-muted rounded w-full"></div>
      </div>
      <div>
        <div className="h-6 bg-muted rounded w-24 mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-6 bg-muted rounded w-16"></div>
            ))}
        </div>
      </div>
      <div>
        <div className="h-6 bg-muted rounded w-32 mb-4"></div>
        <div className="space-y-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-5 bg-muted rounded w-full"></div>
            ))}
        </div>
      </div>
    </div>
  )
}
