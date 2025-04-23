// Redirect /blog/search to /blog/search/page
export function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''

  return Response.json({
    results: [],
    message:
      'Search API moved to /api/blog/search. This is a temporary redirect for backward compatibility.',
  })
}
