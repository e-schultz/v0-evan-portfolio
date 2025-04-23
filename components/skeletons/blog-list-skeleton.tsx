export function BlogListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-4 bg-muted rounded-full w-4"></div>
                <div className="h-4 bg-muted rounded-md w-24"></div>
              </div>
              <div className="h-6 bg-muted rounded-md w-3/4"></div>
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-muted rounded-full w-16"></div>
                <div className="h-6 bg-muted rounded-full w-16"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
