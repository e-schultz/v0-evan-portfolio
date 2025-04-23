export function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get("q") || ""
  const redirectUrl = `/api/blog/search?q=${encodeURIComponent(query)}`

  return Response.redirect(redirectUrl, 307)
}
