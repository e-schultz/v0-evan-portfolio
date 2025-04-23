import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { BlogPost } from "@/lib/content-types"

interface BlogPreviewProps {
  posts: BlogPost[]
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-16 md:py-24 bg-background" id="blog">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            Thoughts, tutorials, and insights on web development, team leadership, and technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  {post.date}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && <Badge variant="outline">+{post.tags.length - 3}</Badge>}
                </div>
              </CardContent>
              <CardFooter>
                <a
                  href={`/blog/${post.slug}`}
                  className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="/blog"
            className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="View All Articles"
          >
            View All Articles
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 h-4 w-4"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
