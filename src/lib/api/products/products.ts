import { apiRequest } from "../helpers/client";
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
  limit = 16,
  skip = 0,
}: ProductListParams = {}): Promise<ProductsResponse> {
  return apiRequest<ProductsResponse>("/products", { limit, skip });
}

export function getProductsByCategory({
  category,
  limit = 16,
  skip = 0,
}: CategoryProductsParams): Promise<ProductsResponse> {
  return apiRequest<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`,
    { limit, skip },
  );
}

export function searchProducts({
  query,
  limit = 16,
  skip = 0,
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