import { notFound } from "next/navigation";
import { ApiRequestError } from "@/lib/api/client";
import { getProductById } from "@/lib/api/products";

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

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-semibold">{product.title}</h1>
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 font-medium">${product.price.toFixed(2)}</p>
    </main>
  );
}