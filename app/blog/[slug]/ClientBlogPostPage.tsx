'use client'

import { getBlogPost } from '@/lib/content-api'
import { BlogContent } from '@/components/blog/blog-content'
import { ClientBlogContent } from '@/components/blog/client-blog-content'
import { Suspense } from 'react'
import { BlogPostSkeleton } from '@/components/skeletons/blog-post-skeleton'

export default function ClientBlogPostPage({ params }: { params: { slug: string } }) {
  // Await params before accessing its properties (in an async function)
  const fetchBlogPost = async () => {
    const resolvedParams = await params
    return getBlogPost(resolvedParams.slug)
  }

  // Use the async function to create the promise
  const blogPostPromise = fetchBlogPost()

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
    (block) => block.type === 'interactive' || block.type === 'embed',
  )

  return (
    <>
      {hasInteractiveElements ? (
        <ClientBlogContent blogPost={blogPost} />
      ) : (
        <BlogContent blogPost={blogPost} />
      )}
    </>
  )
}
