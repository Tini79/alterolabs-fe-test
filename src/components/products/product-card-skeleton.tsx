import { Skeleton, TextSkeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-pebble bg-white"
    >
      <Skeleton className="aspect-square rounded-none" />
      <div className="space-y-2 p-3">
        <TextSkeleton className="h-4 w-4/5" />
        <TextSkeleton className="h-3 w-2/5" />
        <div className="flex items-center justify-between gap-2 pt-1">
          <TextSkeleton className="h-4 w-1/4" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <TextSkeleton className="h-3 w-1/3" />
      </div>
    </article>
  );
}
