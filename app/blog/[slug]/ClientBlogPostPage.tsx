"use client"

import { getBlogPost } from "@/lib/content-api"
import { BlogContent } from "@/components/blog/blog-content"
import { ClientBlogContent } from "@/components/blog/client-blog-content"
import { Suspense } from "react"
import { BlogPostSkeleton } from "@/components/skeletons/blog-post-skeleton"

export default function ClientBlogPostPage({ params }: { params: { slug: string } }) {
  // Fetch data in the Server Component
  const blogPostPromise = getBlogPost(params.slug)

  // Use server component for static content
  // Only use client component if needed for interactive elements

  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent blogPostPromise={blogPostPromise} />
    </Suspense>
  )
}

async function BlogPostContent({ blogPostPromise }: { blogPostPromise: Promise<any> }) {
  const blogPost = await blogPostPromise

  if (!blogPost) {
    return <div>Post not found</div>
  }

  // Check if the post has interactive elements that require client rendering
  const hasInteractiveElements = blogPost.content.some(
    (block) => block.type === "interactive" || block.type === "embed",
  )

  return <>{hasInteractiveElements ? <ClientBlogContent blogPost={blogPost} /> : <BlogContent blogPost={blogPost} />}</>
}
