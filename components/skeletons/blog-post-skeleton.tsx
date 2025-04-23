export function BlogPostSkeleton() {
  return (
    <div>
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 bg-muted animate-pulse rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded w-3/4"></div>
        <div className="h-4 bg-muted animate-pulse rounded"></div>
        <div className="h-4 bg-muted animate-pulse rounded"></div>
        <div className="h-4 bg-muted animate-pulse rounded w-4/5"></div>
        <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
      </div>
    </div>
  )
}
