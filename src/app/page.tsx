import { ProductCatalogSection } from "@/components/products/product-catalog-section";
import { getProductCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products/products";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  // const { category } = await searchParams;
  // const activeCategory = Array.isArray(category) ? category[0] : category;
  const productRes = await getProducts();
  const categories = await getProductCategories();
  const { products } = productRes;

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-8 px-4 sm:px-8 lg:px-16 sm:items-start">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-1">Our Products</h1>
          <p>Discover great products at amazing prices</p>
        </div>
        <ProductCatalogSection
          products={products}
          categories={categories}
          total={productRes.total}
        />
      </main>
    </div>
  );
}
