'use client'
import type { BlogPost } from '@/lib/content-types'
import { renderContentBlocks } from '@/lib/format-content'
import Image from 'next/image'

// Client component receives pre-fetched data
export function ClientBlogContent({ blogPost }: { blogPost: BlogPost }) {
  return (
    <div>
      {blogPost.image && (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 overflow-hidden rounded-lg">
          <Image
            src={blogPost.image || '/placeholder.svg'}
            alt={blogPost.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            priority={true}
          />
        </div>
      )}
      <div className="prose prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none">
        {renderContentBlocks(blogPost.content)}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blogPost.title,
            datePublished: blogPost.date,
            author: {
              '@type': 'Person',
              name: 'Evan Schultz',
            },
          }),
        }}
      />
    </div>
  )
}
