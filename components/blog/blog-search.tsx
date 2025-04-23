"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface BlogSearchProps {
  initialQuery?: string
}

export function BlogSearch({ initialQuery = "" }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const router = useRouter()

  // Update the search query when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full">
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
  )
}
