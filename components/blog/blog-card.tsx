import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { getBlogImageUrl } from "@/lib/image-utils"

interface BlogCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    image?: string
    category?: string
  }
  showCategory?: boolean
  priority?: boolean
}

// Add named export here
export const BlogCard: React.FC<BlogCardProps> = ({ post, showCategory = false, priority = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read more about ${post.title}`}
        prefetch={true}
        className="block h-full"
      >
        {post.image && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-4">
            <Image
              src={getBlogImageUrl(post.image) || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
            />
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{post.excerpt}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">{new Date(post.date).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  )
}

// Keep default export for backward compatibility
export default BlogCard
