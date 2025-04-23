'use client'
import { use } from 'react'
import { searchPosts } from '@/lib/server-actions'
import { BlogCard } from '@/components/cards/blog-card'
import { NoResults } from '@/components/ui/no-results'

// This component uses a proper suspense-compatible pattern
export function SearchResults({ query }: { query: string }) {
  // Use the searchPosts server action which returns a Promise
  // The 'use' hook is suspense-compatible
  const results = use(searchPosts(query))

  return (
    <div>
      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((post, index) => (
            <BlogCard key={index} post={post} showCategory={true} />
          ))}
        </div>
      ) : (
        <NoResults
          title="No results found"
          message={`No articles match your search for "${query}".`}
          actionText="Browse all articles"
          actionLink="/blog"
        />
      )}
    </div>
  )
}
