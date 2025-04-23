'use client'

import { useState } from 'react'
import { useCachedFetch } from '@/lib/use-cached-fetch'
import { useDebounce } from '@/lib/use-debounce'
import type { BlogPost } from '@/lib/content-types'
import { BlogCard } from '@/components/blog/blog-card'
import { NoResults } from '@/components/ui/no-results'

export function BlogSearchClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const {
    data: searchResults,
    loading,
    error,
  } = useCachedFetch<BlogPost[]>(
    `/blog/search?q=${encodeURIComponent(debouncedSearch)}`,
    {},
    60000, // 1 minute cache
  )

  return (
    <div className="w-full">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {loading && searchQuery && <div>Searching...</div>}

      {error && <div>Error: {error.message}</div>}

      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        searchQuery && !loading && <NoResults message="No blog posts found matching your search." />
      )}
    </div>
  )
}
