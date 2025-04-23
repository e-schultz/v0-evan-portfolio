"use client"

import { Suspense, use } from "react"
import type { BlogPost } from "@/lib/content-types"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { ContentError } from "@/components/content-error"
import { BlogListSkeleton } from "@/components/skeletons/blog-list-skeleton"

interface AsyncBlogListProps {
  blogPostsPromise: Promise<BlogPost[]>
  columns?: 1 | 2 | 3 | 4
  showCategory?: boolean
}

export function AsyncBlogListWrapper({ blogPostsPromise, columns = 3, showCategory = false }: AsyncBlogListProps) {
  return (
    <Suspense fallback={<BlogListSkeleton count={6} />}>
      <AsyncBlogList blogPostsPromise={blogPostsPromise} columns={columns} showCategory={showCategory} />
    </Suspense>
  )
}

function AsyncBlogList({ blogPostsPromise, columns, showCategory }: AsyncBlogListProps) {
  // Use the React 'use' hook to handle the promise
  const blogPosts = use(blogPostsPromise)

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

  return <BlogPostGrid posts={uniquePosts} columns={columns} showCategory={showCategory} />
}
