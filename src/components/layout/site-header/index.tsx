"use client";

import Link from "next/link";
import { SearchBar } from "./search-bar";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { useState } from "react";

export function SiteHeader() {
  const [onOpenSearchBar, setOnOpenSearchBar] = useState<boolean>(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 bg-white drop-shadow-xs">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between  px-4">
          <div className="flex gap-8">
            <Link href="/" className="text-lg font-semibold">
              Shop Demo
            </Link>
            <div className="hidden sm:block">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SearchBar onToggleSidebar={setOnOpenSearchBar} />
            <MobileMenu />
          </div>
        </div>
      </header>
      {onOpenSearchBar &&
        <div className="w-full h-screen bg-black/40"></div>
      }
    </>
  );
}
