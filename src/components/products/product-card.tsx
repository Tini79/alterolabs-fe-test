import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border">
      {product.thumbnail ? (
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="h-48 w-full object-cover"
        />
      ) : null}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="font-semibold">
          {product.title}
        </Link>
        <p className="text-sm">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}
