import type { BlogPost } from "@/lib/content-types"
import { renderContentBlocks } from "@/lib/format-content"
import Image from "next/image"
import { getBlogImageUrl, getImageSizes } from "@/lib/image-utils"

// Server component for static blog content
export function BlogContent({ blogPost }: { blogPost: BlogPost }) {
  // Use the image utility to get the full URL
  const imageUrl = blogPost.image ? getBlogImageUrl(blogPost.image) : null

  return (
    <div>
      {imageUrl && (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 overflow-hidden rounded-lg">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={blogPost.title}
            fill
            sizes={getImageSizes("hero")}
            className="object-cover"
            priority={true}
          />
        </div>
      )}
      <div className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none">
        {renderContentBlocks(blogPost.content)}
      </div>
    </div>
  )
}
