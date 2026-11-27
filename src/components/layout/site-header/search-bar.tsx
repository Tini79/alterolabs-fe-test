"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export function SearchBar({ onToggleSidebar }: { onToggleSidebar: (toggleState: boolean) => void }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const modalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onToggleSidebar(isOpen)
    if (!isOpen) return;

    modalInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onToggleSidebar]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchTerm = query.trim();

    if (!searchTerm) return;

    setIsOpen(false);
    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <>
      <div className="hidden sm:block" role="search" aria-label="Product search">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
          </span>
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            readOnly
            onClick={() => setIsOpen(true)}
            className="min-h-10 w-full min-[512px]:min-w-48 cursor-pointer appearance-none rounded-full bg-porcelain pl-10 pr-4 text-sm font-medium text-obsidian placeholder:text-slate"
          />
        </div>
      </div>
      <div className="sm:hidden">
        <button
          type="button"
          aria-label="Search products"
          onClick={() => setIsOpen(true)}
          className="flex size-10 items-center justify-center rounded-full text-obsidian hover:bg-porcelain"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-70">
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="relative w-full bg-white p-4 shadow-md"
          >
            <form
              role="search"
              onSubmit={submitSearch}
              className="mx-auto flex w-full max-w-6xl items-center gap-3"
            >
              <div className="relative min-w-0 flex-1">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
                </span>
                <input
                  ref={modalInputRef}
                  type="search"
                  aria-label="Search products"
                  placeholder="Search products..."
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  className="h-14 w-full rounded-full bg-porcelain pl-11 pr-4 text-base text-obsidian placeholder:text-slate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </div>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setIsOpen(false)}
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-obsidian hover:bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
