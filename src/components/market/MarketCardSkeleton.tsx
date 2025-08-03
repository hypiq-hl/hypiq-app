import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MarketCardSkeleton() {
  return (
    <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>

      {/* Question */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-3" />

      {/* Betting Options */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Skeleton className="h-16 rounded-md" />
        <Skeleton className="h-16 rounded-md" />
      </div>

      {/* Progress Bar */}
      <Skeleton className="h-4 w-full mb-3 rounded-full" />

      {/* Footer Stats */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-6" />
        <Skeleton className="h-3 w-8" />
      </div>
    </Card>
  )
} 