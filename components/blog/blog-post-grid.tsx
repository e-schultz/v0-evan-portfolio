import { BlogCard } from "@/components/cards/blog-card"
import type { BlogPost } from "@/lib/content-types"

interface BlogPostGridProps {
  posts: BlogPost[]
  columns?: 1 | 2 | 3 | 4
  showCategory?: boolean
}

export function BlogPostGrid({ posts, columns = 3, showCategory = false }: BlogPostGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {posts.map((post, index) => (
        <BlogCard key={index} post={post} showCategory={showCategory} />
      ))}
    </div>
  )
}
