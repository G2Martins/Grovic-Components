export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-4 pt-2">
      <div className="h-7 w-48 rounded bg-muted/50" />
      <div className="h-4 w-72 rounded bg-muted/30" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[110px] rounded bg-muted/20 border border-border" />
        ))}
      </div>
    </div>
  )
}
