import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#e6e9f0] bg-white">
      <div className="relative aspect-square bg-[#f0f2f7]">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-2"
          />
        ) : null}
      </div>
      <div className="p-3">
        <Link
          href={`/products/${product.id}`}
          className="block truncate text-[13px] font-semibold leading-5 text-[#171923] hover:underline"
        >
          {product.title}
        </Link>
        <p className="truncate text-xs text-[#687086]">{product.category}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-[#171923]">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }).format(product.price)}
          </p>
          {product.discountPercentage ? (
            <span className="shrink-0 rounded-full bg-[#ffe8eb] px-2 py-1 text-[10px] font-semibold text-[#d72e44]">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          ) : null}
        </div>
        {typeof product.rating === "number" ? (
          <div
            className="mt-2 flex items-center gap-1 text-xs text-[#4b5563]"
            aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
          >
            <span aria-hidden="true" className="text-[#f6b51e]">
              &#9733;
            </span>
            <span>{product.rating.toFixed(1)}</span>
            {product.reviews ? <span>({product.reviews.length})</span> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
