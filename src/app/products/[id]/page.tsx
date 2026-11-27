import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/product-details";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductPurchasePanel } from "@/components/products/product-purchase-panel";
import { ApiRequestError } from "@/lib/api/helpers/client";
import { getProductById } from "@/lib/api/products/products";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;

  try {
    product = await getProductById(id);
  } catch (error) {
    if (
      error instanceof ApiRequestError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound();
    }

    throw error;
  }

  const images = product.images?.length
    ? product.images
    : product.thumbnail
      ? [product.thumbnail]
      : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-slate mb-4">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="ml-2">
            Back to Products
          </span>
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <ProductImageGallery title={product.title} images={images} />
        <ProductPurchasePanel product={product} />
      </div>
      <ProductDetails product={product} />
    </main>
  );
}