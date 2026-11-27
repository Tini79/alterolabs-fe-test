"use client"

import type { Product, ProductCategory, ProductsResponse } from "@/types/product";
import { CategoryFilter } from "./category-filter";
import { ProductCard } from "./product-card";
import { useState } from "react";

export function ProductCatalogSection({
  products,
  categories
}:{
  products: Product[],
  categories: ProductCategory[]
}) {
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [filterError, setFilterError] = useState<string | null>(null);

  async function filterByCategory(category: string) {
    setFilterError(null);

    try {
      const params = new URLSearchParams();
      if (category) {
        params.set("category", category);
      }

      const response = await fetch(`/api/products?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const error = (await response.json()) as { message?: string };
        throw new Error(error.message ?? "Could not load products.");
      }

      const result = (await response.json()) as ProductsResponse;
      setCurrentProducts(result.products);
    } catch (error) {
      setFilterError(
        error instanceof Error ? error.message : "Could not load products.",
      );
    }
  }

  return (
    <>
      <CategoryFilter categories={categories} onClickButton={filterByCategory} />
      {filterError ? <p role="alert">{filterError}</p> : null}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}