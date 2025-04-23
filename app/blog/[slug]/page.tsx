// This is a Server Component
import { getBlogPost } from "@/lib/content-api"
import { ClientBlogContent } from "@/components/blog/client-blog-content"

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
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Await params before accessing its properties
  const resolvedParams = await params
  // Fetch data in the Server Component
  const blogPost = await getBlogPost(resolvedParams.slug)

  // Pass data as props to the Client Component
  return (
    <div className="container py-8 px-4 md:px-6">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{blogPost.title}</h1>
        <div className="text-muted-foreground mb-8">
          {new Date(blogPost.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {blogPost.category && (
            <span className="ml-4">
              in <span className="text-primary">{blogPost.category}</span>
            </span>
          )}
        </div>
        <ClientBlogContent blogPost={blogPost} />
      </article>
    </div>
  )
}
