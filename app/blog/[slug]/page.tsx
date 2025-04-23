import { getBlogPost, getAllBlogSlugs } from "@/lib/content-api"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogContent } from "@/components/blog/blog-content"
import type { Metadata } from "next"

// Define proper types for the params
type PageParams = {
  params: {
    slug: string
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
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
export default async function Page({ params }: PageParams) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <article className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline" prefetch={true}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </div>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, the blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse All Blog Posts
            </Link>
          </div>
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

        <BlogContent blogPost={post} />
      </article>
    </div>
  )
}
