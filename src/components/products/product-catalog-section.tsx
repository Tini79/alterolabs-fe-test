"use client"
import { Product, ProductCategory, ProductsResponse } from "@/types/product";
import { CategoryFilter } from "./category-filter";
import { ProductCard } from "./product-card";

export function ProductCatalogSection({
  products,
  categories
}:{
  products: Product[],
  categories: ProductCategory[]
}) {
  function filterByCategory(){
    // TODO: call api to filter the products
  }

  return (
    <>
    <CategoryFilter categories={categories} onClickButton={filterByCategory} />
      {products.map((product, idx) => (
        <ProductCard key={idx} product={product}/>
      ))}
    </>
  )
}