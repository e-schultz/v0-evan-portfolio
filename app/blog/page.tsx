import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { getAllBlogPosts, getAllTags } from "@/lib/content-api"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Evan Schultz",
  description: "Thoughts, tutorials, and insights on web development, team leadership, and technology.",
}

export default async function BlogPage() {
  const tags = await getAllTags()
  const posts = await getAllBlogPosts()
  const recentPosts = posts.slice(0, 3)

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
              <BlogSidebar tags={tags} recentPosts={recentPosts} />
            </div>

            {/* Blog Posts */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-8">
              <>
                <div className="sm:hidden">
                  <BlogPostGrid posts={posts} columns={1} showCategory={true} />
                </div>
                <div className="hidden sm:block">
                  <BlogPostGrid posts={posts} columns={2} showCategory={true} />
                </div>
              </>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  )
}
