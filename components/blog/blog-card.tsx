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
  }
  priority?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ post, priority = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
        {post.image && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-4">
            <Image
              src={getBlogImageUrl(post.image) || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
          <p className="text-gray-500 text-xs mt-2">{new Date(post.date).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
