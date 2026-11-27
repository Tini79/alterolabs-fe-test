import type { Product } from "@/types/product";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <section aria-labelledby="product-details-title" className="mt-8">
      <h2
        id="product-details-title"
        className="text-xl font-semibold text-obsidian"
      >
        Product Details
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate">
        {product.description}
      </p>
    </section>
  );
}
