"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { BlogPost } from "@/lib/content-types"

interface BlogSearchClientProps {
  initialQuery?: string
  initialResults?: BlogPost[]
  showResults?: boolean
}

export function BlogSearchClient({
  initialQuery = "",
  initialResults = [],
  showResults = false,
}: BlogSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<BlogPost[]>(initialResults)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      // Navigate to search page with query
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  if (!showResults) {
    // Just render the search form
    return (
      <form onSubmit={handleSearch} className="flex max-w-lg mx-auto">
        <Input
          type="search"
          placeholder="Search articles..."
          className="rounded-r-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </form>
    )
  }

  // Render search results
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      ) : results.length > 0 ? (
        <BlogPostGrid posts={results} columns={3} showCategory={true} />
      ) : initialQuery ? (
        <NoResults
          title="No results found"
          message={`No articles match your search for "${initialQuery}".`}
          actionText="Browse all articles"
          actionLink="/blog"
        />
      ) : (
        <NoResults
          title="Enter a search term"
          message="Type in the search box above to find articles."
          actionText="Browse all articles"
          actionLink="/blog"
        />
      )}
    </div>
  )
}
