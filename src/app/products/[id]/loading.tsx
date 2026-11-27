import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main
      role="status"
      aria-label="Loading product"
      aria-busy="true"
      className="mx-auto w-full max-w-6xl px-4 py-8"
    >
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="h-5 w-36" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="min-w-0">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="mt-3 flex gap-2 overflow-hidden pb-1">
            <Skeleton className="size-16 shrink-0 rounded-lg" />
            <Skeleton className="size-16 shrink-0 rounded-lg" />
            <Skeleton className="size-16 shrink-0 rounded-lg" />
          </div>
        </div>

        <section className="flex flex-col">
          <Skeleton className="h-8 w-3/4 max-w-lg" />
          <Skeleton className="mt-2 h-4 w-28" />

          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <dl className="mt-4 text-sm">
            <div className="flex items-center justify-between gap-4 py-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          </dl>

          <Skeleton className="mt-4 h-11 w-full rounded-lg" />
        </section>
      </div>

      <section className="mt-8">
        <Skeleton className="h-7 w-40" />
        <div className="mt-3 max-w-3xl space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </section>
    </main>
  );
}
