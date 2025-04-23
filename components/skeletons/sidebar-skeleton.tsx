export function SidebarSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-6 bg-muted rounded w-24 mb-4"></div>
        <div className="h-10 bg-muted rounded w-full"></div>
      </div>
      <div>
        <div className="h-6 bg-muted rounded w-24 mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-6 bg-muted rounded w-16"></div>
            ))}
        </div>
      </div>
      <div>
        <div className="h-6 bg-muted rounded w-32 mb-4"></div>
        <div className="space-y-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-5 bg-muted rounded w-full"></div>
            ))}
        </div>
      </div>
    </div>
  )
}
