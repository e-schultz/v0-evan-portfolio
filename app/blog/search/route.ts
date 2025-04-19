// Redirect /blog/search to /blog/search/page
export function GET() {
  return Response.redirect("/blog/search/page-server")
}
