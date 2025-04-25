"use client"

import { Suspense, use } from "react"
import type { BlogPost } from "@/lib/content-types"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { SidebarSkeleton } from "@/components/skeletons/sidebar-skeleton"

interface AsyncBlogSidebarProps {
  postsPromise: Promise<BlogPost[]>
  tagsPromise: Promise<string[]>
}

export function AsyncBlogSidebarWrapper({ postsPromise, tagsPromise }: AsyncBlogSidebarProps) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <AsyncBlogSidebar postsPromise={postsPromise} tagsPromise={tagsPromise} />
    </Suspense>
  )
}

function AsyncBlogSidebar({ postsPromise, tagsPromise }: AsyncBlogSidebarProps) {
  // Use the React 'use' hook to handle the promises
  const posts = use(postsPromise)
  const tags = use(tagsPromise)

  // Filter out duplicate blog posts by slug
  const uniquePosts = Array.from(new Map(posts.map((post) => [post.slug, post])).values())

  return <BlogSidebar tags={tags} recentPosts={uniquePosts.slice(0, 3)} />
}
