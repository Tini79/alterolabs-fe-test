import { ApiRequestError } from "@/lib/api/helpers/client";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/api/products/products";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const category = searchParams.get("category");
  const query = searchParams.get("search");
  const limit = Number(searchParams.get("limit") ?? 16);
  const skip = Number(searchParams.get("skip") ?? 0);

  if (
    !Number.isSafeInteger(limit) ||
    limit < 1 ||
    limit > 100 ||
    !Number.isSafeInteger(skip) ||
    skip < 0
  ) {
    return Response.json(
      { message: "Invalid pagination parameters." },
      { status: 400 },
    );
  }

  try {
    const products = category
      ? await getProductsByCategory({ category, limit, skip })
      : query ? await searchProducts({ query, limit, skip }) : await getProducts({ limit, skip });

    return Response.json(products);
  } catch (error) {
    const status =
      error instanceof ApiRequestError ? (error.status ?? 502) : 500;
    const message =
      error instanceof Error ? error.message : "Could not load products.";

    return Response.json({ message }, { status });
  }
}