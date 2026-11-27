import { apiRequest } from "./client";
import type { ProductCategory } from "@/types/product";

type CategoryResponse = ProductCategory[] | string[];

export async function getProductCategories(): Promise<ProductCategory[]> {
  const categories = await apiRequest<CategoryResponse>("/products/categories");

  return categories.map((category) => {
    if (typeof category === "string") {
      return {
        slug: category,
        name: category,
        url: `/products/category/${encodeURIComponent(category)}`,
      };
    }

    return category;
  });
}
