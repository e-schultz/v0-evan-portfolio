"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { SearchResults } from "@/components/search/search-results"
import { LoadingSpinner } from "@/components/loading-spinner"

interface BlogSearchClientProps {
  initialQuery?: string
  initialResults?: any[]
  showResults?: boolean
}

export function BlogSearchClient({
  initialQuery = "",
  initialResults = [],
  showResults = false,
}: BlogSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex w-full mb-8">
        <Input
          type="search"
          placeholder="Search articles..."
          className="rounded-r-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="default" size="icon" className="rounded-l-none">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {isSearching && !showResults && <LoadingSpinner />}

      {showResults && initialQuery && <SearchResults query={initialQuery} />}
    </div>
  )
}
