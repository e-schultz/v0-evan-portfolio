import { searchPosts } from '@/lib/content-api'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''

  if (!query) {
    return Response.json({ results: [] })
  }

  try {
    const results = await searchPosts(query)
    return Response.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return Response.json({ error: 'Failed to perform search' }, { status: 500 })
  }
}
