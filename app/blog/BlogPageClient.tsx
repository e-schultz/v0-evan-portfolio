"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getAllBlogPosts, getAllTags } from "@/lib/content-api"
import { AsyncBlogListWrapper } from "@/components/async/async-blog-list"
import { Suspense, useState, useEffect } from "react"
import { SidebarSkeleton } from "@/components/skeletons/sidebar-skeleton"
import { ErrorBoundary } from "@/components/error-boundary"

export default function BlogPageClient() {
  // Create promises that will be resolved in the client components
  const postsPromise = getAllBlogPosts()
  const tagsPromise = getAllTags()

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
                  <BlogSidebarAsync tagsPromise={tagsPromise} postsPromise={postsPromise} />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Blog Posts */}
            <div className="order-1 lg:order-2 lg:col-span-3 space-y-8">
              <AsyncBlogListWrapper postsPromise={postsPromise} columns={1} showCategory={true} className="sm:hidden" />
              <AsyncBlogListWrapper
                postsPromise={postsPromise}
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

// Async component for sidebar
function BlogSidebarAsync({
  tagsPromise,
  postsPromise,
}: {
  tagsPromise: Promise<string[]>
  postsPromise: Promise<any[]>
}) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <AsyncBlogSidebar tagsPromise={tagsPromise} postsPromise={postsPromise} />
    </Suspense>
  )
}

// Client component for sidebar
function AsyncBlogSidebar({
  tagsPromise,
  postsPromise,
}: {
  tagsPromise: Promise<string[]>
  postsPromise: Promise<any[]>
}) {
  const [tags, setTags] = useState<string[]>([])
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [fetchedTags, fetchedPosts] = await Promise.all([tagsPromise, postsPromise])

        if (isMounted) {
          setTags(fetchedTags)

          // Filter out duplicate blog posts by slug and get the 3 most recent
          const uniquePosts = Array.from(new Map(fetchedPosts.map((post) => [post.slug, post])).values())

          setRecentPosts(uniquePosts.slice(0, 3))
        }
      } catch (err) {
        console.error("Error loading sidebar data:", err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [tagsPromise, postsPromise])

  if (isLoading) {
    return <SidebarSkeleton />
  }

  return <BlogSidebar tags={tags} recentPosts={recentPosts} />
}
