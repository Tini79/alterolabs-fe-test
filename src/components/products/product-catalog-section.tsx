"use client"

import type { Product, ProductCategory, ProductsResponse } from "@/types/product";
import { CategoryFilter } from "./category-filter";
import { ProductCard } from "./product-card";
import { ProductPagination } from "./product-pagination";
import { useState } from "react";

const PAGE_SIZE = 16;

export function ProductCatalogSection({
  products,
  categories,
  total,
}: {
  products: Product[];
  categories: ProductCategory[];
  total: number;
}) {
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [totalProducts, setTotalProducts] = useState(total);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");
  const [filterError, setFilterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadProducts(category: string, page: number) {
    if (isLoading) {
      return;
    }

    setFilterError(null);
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      if (category) {
        params.set("category", category);
      }
      params.set("limit", String(PAGE_SIZE));
      params.set("skip", String((page - 1) * PAGE_SIZE));

      const response = await fetch(`/api/products?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const error = (await response.json()) as { message?: string };
        throw new Error(error.message ?? "Could not load products.");
      }

      const result = (await response.json()) as ProductsResponse;
      setCurrentProducts(result.products);
      setTotalProducts(result.total);
      setCurrentPage(page);
      setActiveCategory(category);
    } catch (error) {
      setFilterError(
        error instanceof Error ? error.message : "Could not load products.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  return (
    <>
      <CategoryFilter
        categories={categories}
        onClickButton={(category) => loadProducts(category, 1)}
        disabled={isLoading}
      />
      {filterError ? <p role="alert">{filterError}</p> : null}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        disabled={isLoading}
        onPageChange={(page) => loadProducts(activeCategory, page)}
      />
    </>
  );
}