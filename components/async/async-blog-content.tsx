"use client"

import { Suspense, use } from "react"
import type { BlogPost } from "@/lib/content-types"
import { BlogContent } from "@/components/blog/blog-content"
import { ContentError } from "@/components/content-error"

interface AsyncBlogContentProps {
  blogPostPromise: Promise<BlogPost | null>
}

export function AsyncBlogContentWrapper({ blogPostPromise }: AsyncBlogContentProps) {
  return (
    <Suspense fallback={<BlogContentSkeleton />}>
      <AsyncBlogContent blogPostPromise={blogPostPromise} />
    </Suspense>
  )
}

function AsyncBlogContent({ blogPostPromise }: AsyncBlogContentProps) {
  // Use the React 'use' hook to handle the promise
  const blogPost = use(blogPostPromise)

  if (!blogPost) {
    return (
      <ContentError
        title="Blog Post Not Found"
        message="The requested blog post could not be found."
        backLink="/blog"
        backText="Back to Blog"
      />
    )
  }

  return <BlogContent blogPost={blogPost} />
}

function BlogContentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="w-full h-[300px] bg-muted rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  )
}
