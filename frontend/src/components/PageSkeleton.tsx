export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-8 w-48 bg-line rounded" />
      <div className="h-4 w-full bg-line rounded" />
      <div className="h-4 w-3/4 bg-line rounded" />
      <div className="h-4 w-1/2 bg-line rounded" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-line bg-paper p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-line" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-line rounded" />
          <div className="h-3 w-20 bg-line rounded" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-line rounded" />
        <div className="h-4 w-5/6 bg-line rounded" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 w-full bg-line rounded" />
      ))}
    </div>
  )
}
