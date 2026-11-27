"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";

  return (
    <>
      <ul className="flex gap-3">
        <li className="relative">
          <Link href="/" className="text-sm font-semibold">
            Products
          </Link>
          {isProductsPage ? (
            <div
              aria-hidden="true"
              className="absolute -bottom-1 left-0 block w-full border-b-2 border-blue-500"
            />
          ) : null}
        </li>
      </ul>
    </>
  );
}