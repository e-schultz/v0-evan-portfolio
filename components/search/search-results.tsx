"use client"
import { useState, useEffect } from "react"
import { searchPostsAction } from "@/lib/server-actions"
import { BlogCard } from "@/components/cards/blog-card"
import { NoResults } from "@/components/ui/no-results"
import { LoadingSpinner } from "@/components/loading-spinner"

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Use a ref to track if the query has changed
  const [currentQuery, setCurrentQuery] = useState(query)

  useEffect(() => {
    // Only fetch if the query has changed
    if (currentQuery !== query) {
      setCurrentQuery(query)
      setLoading(true)

      searchPostsAction(query)
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error searching posts:", err)
          setError(err)
          setLoading(false)
        })
    }
  }, [query, currentQuery])

  // Initial fetch
  useEffect(() => {
    setLoading(true)

    searchPostsAction(query)
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error searching posts:", err)
        setError(err)
        setLoading(false)
      })
  }, []) // Empty dependency array means this runs once on mount

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error searching for "{query}": {error.message}
      </div>
    )
  }

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
