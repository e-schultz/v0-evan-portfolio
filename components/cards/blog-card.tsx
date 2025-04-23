import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { BlogPost } from "@/lib/content-types"

interface BlogCardProps {
  post: BlogPost
  showCategory?: boolean
}

export function BlogCard({ post, showCategory = false }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden relative">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform hover:scale-105"
          priority={false}
          loading="lazy"
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
        {showCategory && (
          <Badge variant="outline" className="mb-2">
            <Link href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`} prefetch={true}>
              {post.category}
            </Link>
          </Badge>
        )}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary">
              <Link href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`} prefetch={true}>
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post.slug}`}
          className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label={`Read more about ${post.title}`}
          prefetch={true}
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
        </Link>
      </CardFooter>
    </Card>
  )
}
