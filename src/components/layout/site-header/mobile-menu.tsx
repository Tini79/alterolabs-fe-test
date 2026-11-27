"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen(true)}
        className="hidden size-10 items-center justify-center rounded-full text-obsidian hover:bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-[640px]:flex"
      >
        <FontAwesomeIcon icon={faBars} aria-hidden="true" />
      </button>
      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="fixed inset-0 z-[60]"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/40"
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="absolute inset-y-0 right-0 h-screen w-80 max-w-[85vw] bg-white p-5 shadow-xl"
        >
          <div className="flex justify-between items-center">
            <h2 className="block text-sm font-semibold text-obsidian">Shop Demo</h2>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="flex size-10 items-center justify-center rounded-full text-obsidian hover:bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-obsidian hover:bg-porcelain"
            >
              Products
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
}
