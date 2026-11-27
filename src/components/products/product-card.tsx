import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import {
  formatPrice,
  getDiscountedPrice,
  getOriginalPrice,
} from "@/lib/utils/price";
import { ProductRating } from "./product-rating";
import { ProductDiscount } from "./product-discount";

export function ProductCard({ product }: { product: Product }) {
  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <article className="overflow-hidden rounded-xl border border-pebble bg-white">
      <div className="relative aspect-square bg-porcelain">
        {product.thumbnail ? (
          <Link
            href={`/products/${product.id}`}
            className="block truncate text-[13px] font-semibold leading-5 text-obsidian hover:underline"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-contain p-2"
            />
          </Link>
        ) : null}
      </div>
      <div className="p-3">
        <Link
          href={`/products/${product.id}`}
          className="block truncate text-[13px] font-semibold leading-5 text-obsidian hover:underline"
        >
          {product.title}
        </Link>
        <p className="truncate text-xs text-slate capitalize">{product.category}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold text-obsidian">
              {formatPrice(discountedPrice)}
            </p>
            {originalPrice !== null ? (
              <p className="text-xs text-slate line-through">
                {formatPrice(originalPrice)}
              </p>
            ) : null}
          </div>
          {product.discountPercentage ? (
            <ProductDiscount discountPercentage={product.discountPercentage} />
          ) : null}
        </div>
        {typeof product.rating === "number" ? (
          <div
            className="mt-2 flex items-center gap-1 text-xs text-slate"
            aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
          >
            <ProductRating rating={product.rating} reviews={product.reviews} />
          </div>

        ) : null}
      </div>
    </article>
  );
}
