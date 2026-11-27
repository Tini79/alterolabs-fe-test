import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          AlteroLabs Store
        </Link>
      </div>
    </header>
  );
}
