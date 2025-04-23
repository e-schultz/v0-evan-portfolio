import { MainLayout } from '@/components/layouts/main-layout'
import { PageHeader } from '@/components/ui/page-header'
import { ContentContainer } from '@/components/ui/content-container'
import { BlogPostGrid } from '@/components/blog/blog-post-grid'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { getAllBlogPosts, getAllTags } from '@/lib/content-api'

export default async function BlogPage() {
  // Direct server data access - no actions needed
  const posts = await getAllBlogPosts()
  const allTags = await getAllTags()

  // Filter out duplicate blog posts by slug
  const uniquePosts = Array.from(new Map(posts.map((post) => [post.slug, post])).values())

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
              <div className="lg:sticky lg:top-20">
                <BlogSidebar tags={allTags} recentPosts={uniquePosts.slice(0, 3)} />
              </div>
            </div>

            {/* Blog Posts */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-8">
              <BlogPostGrid
                posts={uniquePosts}
                columns={1}
                showCategory={true}
                className="sm:hidden"
              />
              <BlogPostGrid
                posts={uniquePosts}
                columns={2}
                showCategory={true}
                className="hidden sm:grid lg:grid-cols-2 xl:grid-cols-3"
              />
            </div>
          </div>
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
