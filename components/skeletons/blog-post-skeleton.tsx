export function BlogPostSkeleton() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <article className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="w-32 h-6 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="h-12 bg-muted rounded-lg w-3/4 mb-4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded w-1/2 mb-8 animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-[300px] bg-muted rounded-lg animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-full animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-full animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
        </div>
      </article>
    </div>
  )
}
