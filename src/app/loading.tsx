import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import {
  ButtonSkeleton,
  InputSkeleton,
  TextSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading products"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8"
    >
      <div className="space-y-2">
        <TextSkeleton className="h-7 w-40" />
        <TextSkeleton className="h-4 w-64 max-w-full" />
      </div>
      <div className="flex flex-wrap gap-3">
        <InputSkeleton className="h-10 w-48 rounded-full" />
        <ButtonSkeleton />
      </div>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
