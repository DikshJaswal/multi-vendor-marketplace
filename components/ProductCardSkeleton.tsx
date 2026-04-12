export default function ProductCardSkeleton() {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-pulse">

      {/* IMAGE */}
      <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" />

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded w-3/4" />
        <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded w-1/2" />
        <div className="h-10 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl" />
      </div>

    </div>
  );
}