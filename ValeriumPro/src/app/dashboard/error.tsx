"use client"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center">
      <p className="text-sm text-muted-foreground">Something went wrong.</p>
      <button
        onClick={reset}
        className="text-xs border border-border px-3 py-1.5 hover:bg-muted/30 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
