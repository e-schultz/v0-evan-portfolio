import { searchPosts } from "@/lib/content-api"
import { Suspense } from "react"
import { LoadingLayout } from "@/components/layouts/loading-layout"
import SearchPageClient from "./page"

// This is a server component that can fetch initial data
export default async function SearchPageServer({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  // If there's a query, fetch initial results
  let initialResults = []
  if (query) {
    initialResults = await searchPosts(query)
  }

  return (
    <Suspense fallback={<LoadingLayout message="Searching..." />}>
      <SearchPageClient initialResults={initialResults} initialQuery={query} />
    </Suspense>
  )
}
