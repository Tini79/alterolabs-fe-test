import { ApiRequestError } from "@/lib/api/helpers/client";
import {
  getProducts,
  getProductsByCategory,
} from "@/lib/api/products/products";

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");

  try {
    const products = category
      ? await getProductsByCategory({ category })
      : await getProducts();

    return Response.json(products);
  } catch (error) {
    const status =
      error instanceof ApiRequestError ? (error.status ?? 502) : 500;
    const message =
      error instanceof Error ? error.message : "Could not load products.";

    return Response.json({ message }, { status });
  }
}