// Redirect /blog/search to /blog/search/page-server
export function GET() {
  return Response.redirect("/blog/search/page-server")
}
