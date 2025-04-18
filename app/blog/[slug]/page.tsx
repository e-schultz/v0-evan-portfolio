import Link from "next/link"
import { notFound } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { ContentContainer } from "@/components/ui/content-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { getBlogPost, getAllBlogSlugs } from "@/lib/content-api"
import { renderContentBlocks } from "@/lib/format-content"
import { ContentError } from "@/components/content-error"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"

// Add this at the top of the file, after the imports
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPost(params.slug)

    if (!post) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      }
    }

    return {
      title: `${post.title} | Evan Schultz`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: [
          {
            url: post.image || "/placeholder.svg",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.image || "/placeholder.svg"],
      },
    }
  } catch (error) {
    console.error(`Error generating metadata for blog post: ${params.slug}`, error)
    return {
      title: "Blog Post | Evan Schultz",
      description: "Read the latest from Evan Schultz",
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("Error generating static params for blog posts:", error)
    return []
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPost(params.slug)

    if (!post) {
      notFound()
    }

    return (
      <MainLayout>
        <ContentContainer maxWidth="4xl" className="px-4 md:px-6">
          <article className="py-8 md:py-12">
            <Button variant="ghost" asChild className="mb-6 md:mb-8">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
              </Link>
            </Button>

            <div className="mb-6 md:mb-8">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-lg"
              />
            </div>

            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {post.author}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    <Link href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}>{tag}</Link>
                  </Badge>
                ))}
              </div>
            </div>

            <ErrorBoundaryWrapper>
              <div className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none">
                {renderContentBlocks(post.content)}
              </div>
            </ErrorBoundaryWrapper>
          </article>
        </ContentContainer>
      </MainLayout>
    )
  } catch (error) {
    console.error(`Error loading blog post: ${params.slug}`, error)
    return (
      <MainLayout>
        <ContentContainer>
          <div className="py-12">
            <ContentError
              title="Failed to Load Blog Post"
              message="We're having trouble loading this blog post. Please try again later."
              backLink="/blog"
              backText="Back to Blog"
            />
          </div>
        </ContentContainer>
      </MainLayout>
    )
  }
}
