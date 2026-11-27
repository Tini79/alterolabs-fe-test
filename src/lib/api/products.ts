import { apiRequest } from "./client";
import type { Product, ProductsResponse } from "@/types/product";

interface ProductListParams {
  limit?: number;
  skip?: number;
}

interface CategoryProductsParams extends ProductListParams {
  category: string;
}

interface SearchProductsParams extends ProductListParams {
  query: string;
}

export function getProducts({
  limit,
  skip,
}: ProductListParams = {}): Promise<ProductsResponse> {
  return apiRequest<ProductsResponse>("/products", { limit, skip });
}

export function getProductsByCategory({
  category,
  limit,
  skip,
}: CategoryProductsParams): Promise<ProductsResponse> {
  return apiRequest<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`,
    { limit, skip },
  );
}

export function searchProducts({
  query,
  limit,
  skip,
}: SearchProductsParams): Promise<ProductsResponse> {
  return apiRequest<ProductsResponse>("/products/search", {
    q: query,
    limit,
    skip,
  });
}

export function getProductById(id: number | string): Promise<Product> {
  return apiRequest<Product>(`/products/${encodeURIComponent(String(id))}`);
}