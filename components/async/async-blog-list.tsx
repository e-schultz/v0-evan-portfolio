"use client"

import { Suspense, use } from "react"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"
import { ContentError } from "@/components/content-error"
import type { BlogPost } from "@/lib/content-types"

export interface AsyncBlogListProps {
  postsPromise: Promise<BlogPost[]>
  columns?: 1 | 2 | 3 | 4
  showCategory?: boolean
  className?: string
}

function AsyncBlogList({ postsPromise, columns, showCategory, className }: AsyncBlogListProps) {
  // Use the React 'use' hook to handle the promise
  const blogPosts = use(postsPromise)

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <ContentError
        title="No Blog Posts Found"
        message="There are currently no blog posts available."
        backLink="/"
        backText="Back to Home"
      />
    )
  }

  // Filter out duplicate blog posts by slug
  const uniquePosts = Array.from(new Map(blogPosts.map((post) => [post.slug, post])).values())

  return <BlogPostGrid posts={uniquePosts} columns={columns} showCategory={showCategory} className={className} />
}

export function AsyncBlogListWrapper({
  postsPromise,
  columns = 3,
  showCategory = false,
  className = "",
}: AsyncBlogListProps) {
  // Create a unique key for the Suspense component based on the current URL
  const key = typeof window !== "undefined" ? window.location.pathname : "server"

  return (
    <Suspense key={key} fallback={<BlogListSkeleton count={6} />}>
      <AsyncBlogList postsPromise={postsPromise} columns={columns} showCategory={showCategory} className={className} />
    </Suspense>
  )
}
