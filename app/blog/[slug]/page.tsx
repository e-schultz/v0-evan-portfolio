import { getBlogPost, getAllBlogSlugs } from "@/lib/content-api"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { ContentErrorFallback } from "@/components/error-fallbacks/content-error-fallback"
import type { BlogPost } from "@/lib/content-types"

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for the page
export async function generateMetadata({ params }: any) {
  const post = await getBlogPost(params.slug)

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

// The page component
export default async function Page({ params }: any) {
  const slug = params.slug
  const post = await getBlogPost(slug)

  if (!post) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <article className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline" prefetch={true}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </div>

          <ContentErrorFallback
            title="Blog Post Not Found"
            message="The requested blog post could not be found."
            backLink="/blog"
            backText="Back to Blog"
          />
        </article>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <article className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline" prefetch={true}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-8">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.category && (
            <span className="ml-4">
              in <span className="text-primary">{post.category}</span>
            </span>
          )}
        </div>

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
          <BlogContent post={post} />
        </EnhancedErrorBoundary>
      </article>
    </div>
  )
}

// Simple server component to render the blog content
function BlogContent({ post }: { post: BlogPost }) {
  // Check if the post has interactive elements that require client rendering
  const hasInteractiveElements = post.content.some((block) => block.type === "interactive" || block.type === "embed")

  if (hasInteractiveElements) {
    // For interactive content, we'll use a client component
    // This is a simplified approach - in a real app, you might want to use a dynamic import
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>This post contains interactive elements that can't be rendered on the server.</p>
      </div>
    )
  }

  // For static content, render directly on the server
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {post.content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                {block.content}
              </h2>
            ) : (
              <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                {block.content}
              </h3>
            )
          case "paragraph":
            return (
              <p key={index} className="my-4">
                {block.content}
              </p>
            )
          case "list":
            return (
              <ul key={index} className="my-4 space-y-2 list-disc pl-5">
                {block.items?.map((item: any, itemIndex: number) => {
                  if (typeof item === "string") {
                    return (
                      <li key={itemIndex} className="text-muted-foreground">
                        {item}
                      </li>
                    )
                  } else if (item.type === "listItem") {
                    return (
                      <li key={itemIndex} className="text-muted-foreground">
                        {item.title && <strong>{item.title}</strong>}
                        {item.title && item.content && " - "}
                        {item.content}
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
