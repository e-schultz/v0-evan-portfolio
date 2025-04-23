"use client"

import { Suspense, use } from "react"
import type { BlogPost } from "@/lib/content-types"
import { BlogSidebar } from "@/components/blog/blog-sidebar"

interface AsyncBlogSidebarProps {
  postsPromise: Promise<BlogPost[]>
  tagsPromise: Promise<string[]>
}

export function AsyncBlogSidebarWrapper({ postsPromise, tagsPromise }: AsyncBlogSidebarProps) {
  return (
    <Suspense
      fallback={
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
      }
    >
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
