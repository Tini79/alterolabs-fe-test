import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3">The page you requested does not exist.</p>
      <Link href="/" className="mt-6 inline-block underline">
        Return to products
      </Link>
    </main>
  );
}