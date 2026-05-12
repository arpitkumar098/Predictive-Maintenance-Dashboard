/**
 * Reusable loading states: spinner, skeleton cards, and skeleton table rows.
 */

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClass} border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin`} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-slate-700 rounded-xl" />
        <div className="w-16 h-6 bg-slate-700 rounded" />
      </div>
      <div className="space-y-2">
        <div className="w-24 h-4 bg-slate-700 rounded" />
        <div className="w-16 h-8 bg-slate-700 rounded" />
        <div className="w-32 h-3 bg-slate-700 rounded" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="h-12 bg-slate-800/50 border-b border-slate-700/50" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-700/30">
          <div className="w-8 h-8 bg-slate-700 rounded-lg" />
          <div className="flex-1 h-4 bg-slate-700 rounded" />
          <div className="w-24 h-4 bg-slate-700 rounded" />
          <div className="w-16 h-6 bg-slate-700 rounded" />
        </div>
      ))}
    </div>
  );
}

export function LoadingError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="glass-card p-8 text-center">
      <p className="text-rose-400 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all text-sm font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
}
