"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ContentContainer } from "@/components/ui/content-container"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { NoResults } from "@/components/ui/no-results"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { searchClientPosts } from "@/lib/content-client-api"
import type { BlogPost } from "@/lib/content-types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const data = await searchClientPosts(query)
        setResults(data)
      } catch (error) {
        console.error("Error searching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set("q", searchQuery)
    }
    window.history.pushState(null, "", `/blog/search?${params.toString()}`)

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const data = await searchClientPosts(searchQuery)
        setResults(data)
      } catch (error) {
        console.error("Error searching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }

  return (
    <MainLayout>
      <PageHeader title="Search Results" description={query ? `Showing results for "${query}"` : "Search for articles"}>
        <div className="mt-8">
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
        </div>
      </PageHeader>

      <section className="py-12">
        <ContentContainer>
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : results.length > 0 ? (
            <BlogPostGrid posts={results} columns={3} showCategory={true} />
          ) : query ? (
            <NoResults
              title="No results found"
              message={`No articles match your search for "${query}".`}
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
        </ContentContainer>
      </section>
    </MainLayout>
  )
}
