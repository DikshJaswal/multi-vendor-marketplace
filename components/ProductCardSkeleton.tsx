export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden animate-pulse">

      {/* IMAGE */}
      <div className="h-48 bg-gray-200" />

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>

    </div>
  );
}