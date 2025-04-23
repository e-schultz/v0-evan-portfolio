import { getBlogPost, getAllBlogSlugs } from "@/lib/content-api"
import { AsyncBlogContentWrapper } from "@/components/async/async-blog-content"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { ContentErrorFallback } from "@/components/error-fallbacks/content-error-fallback"

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Await params before accessing its properties
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    }
  }

  return {
    title: `${post.title} | Blog | Evan Schultz`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Evan Schultz"],
      tags: post.tags,
      images: [
        {
          url: post.image || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Create a promise that will be resolved in the client component
  const blogPostPromise = getBlogPost(params.slug)

  // Get minimal data for the header synchronously
  const basicPostData = await blogPostPromise
    .then((post) =>
      post
        ? {
            title: post.title,
            date: post.date,
            category: post.category,
          }
        : null,
    )
    .catch(() => null)

  return (
    <div className="container py-8 px-4 md:px-6">
      <article className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline" prefetch={true}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>

        {basicPostData && (
          <>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{basicPostData.title}</h1>
            <div className="text-muted-foreground mb-8">
              {new Date(basicPostData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {basicPostData.category && (
                <span className="ml-4">
                  in <span className="text-primary">{basicPostData.category}</span>
                </span>
              )}
            </div>
          </>
        )}

        <EnhancedErrorBoundary
          fallback={
            <ContentErrorFallback
              title="Blog Post Error"
              message="We encountered an error loading this blog post. Please try again later."
              backLink="/blog"
              backText="Back to Blog"
            />
          }
        >
          <AsyncBlogContentWrapper blogPostPromise={blogPostPromise} />
        </EnhancedErrorBoundary>
      </article>
    </div>
  )
}
