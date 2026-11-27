import { ProductCard } from "@/components/products/product-card";
import { searchProducts } from "@/lib/api/products/products";
import { redirect } from "next/navigation";

export default async function ProductSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const params = await searchParams;
  const searchValue = Array.isArray(params.search)
    ? params.search[0]
    : params.search;
  const query = searchValue?.trim() ?? "";

  if (!query) {
    redirect("/");
  }

  const result = await searchProducts({ query, limit: 100 });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-1 text-3xl font-semibold">Search results</h1>
        <p className="text-slate">
          {result.total} {result.total === 1 ? "product" : "products"} for
          {" \""}
          {query}
          {'"'}
        </p>
      </div>
      {result.products.length > 0 ? (
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p role="status" className="text-slate">
          No products found for "{query}".
        </p>
      )}
    </main>
  );
}
