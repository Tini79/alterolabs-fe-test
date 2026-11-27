import { ProductCard } from "@/components/products/product-card";
import { ProductCatalogSection } from "@/components/products/product-catalog-section";
import { getProductCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products/products";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  // const { category } = await searchParams;
  // const activeCategory = Array.isArray(category) ? category[0] : category;
  const productRes = await getProducts();
  const categories = await getProductCategories();
  const {products} = productRes;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ProductCatalogSection products={products} categories={categories}/>
      </main>
    </div>
  );
}
