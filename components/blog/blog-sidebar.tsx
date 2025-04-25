import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BlogSearch } from "@/components/blog/blog-search"
import type { BlogPost } from "@/lib/content-types"

interface BlogSidebarProps {
  tags: string[]
  recentPosts: BlogPost[]
}

export function BlogSidebar({ tags, recentPosts }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Search</h3>
        <BlogSearch />
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
              <Link href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`} prefetch={true}>
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Recent Posts</h3>
        <ul className="space-y-2">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <Link href={`/blog/${post.slug}`} className="text-sm hover:text-primary" prefetch={true}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
