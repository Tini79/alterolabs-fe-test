"use client"

import type { Product } from "@/types/product";
import {
  formatPrice,
  getDiscountedPrice,
  getOriginalPrice,
} from "@/lib/utils/price";
import { ProductRating } from "./product-rating";
import { ProductDiscount } from "./product-discount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const discountPercentage = product.discountPercentage ?? 0;
  const discount = discountPercentage > 0 ? Math.round(discountPercentage) : 0;
  const discountedPrice = getDiscountedPrice(
    product.price,
    discountPercentage,
  );
  const originalPrice = getOriginalPrice(product.price, discountPercentage);
  const stockLabel =
    typeof product.stock !== "number"
      ? "Unknown"
      : product.stock > 0
        ? "Yes"
        : "No";
  const inStock = stockLabel === "Yes";

  return (
    <section aria-labelledby="product-title" className="flex flex-col">
      <h1
        id="product-title"
        className="text-2xl font-semibold tracking-tight text-obsidian"
      >
        {product.title}
      </h1>

      {typeof product.rating === "number" ? (
        <div
          role="img"
          aria-label={`Rated ${product.rating.toFixed(1)} out of 5${product.reviews ? `, ${product.reviews.length} reviews` : ""
            }`}
          className="mt-2 flex items-center gap-1.5 text-sm"
        >
          <ProductRating rating={product.rating} reviews={product.reviews} />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-3xl font-bold text-obsidian">
          {formatPrice(discountedPrice)}
        </span>
        {originalPrice ? (
          <span className="text-sm text-slate line-through">
            {formatPrice(originalPrice)}
          </span>
        ) : null}
        {discount > 0 ? (
          <ProductDiscount discountPercentage={discount} />
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate">{product.description}</p>

      <dl className="mt-4 text-sm">
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-slate">Brand</dt>
          <dd className="font-medium text-obsidian">
            {product.brand || "Unbranded"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-slate">In Stock</dt>
          <dd
            className={`flex items-center gap-1.5 font-medium ${inStock ? "text-obsidian" : "text-slate"
              }`}
          >
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${inStock ? "bg-success" : "bg-slate"
                }`}
            />
            <span className="w-2 h-2 rounded bg-green-400"></span>
            {stockLabel}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        disabled={!inStock}
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        <FontAwesomeIcon icon={faCartShopping} />
        Add to Cart
      </button>
    </section>
  );
}
