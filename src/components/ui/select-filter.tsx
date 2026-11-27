"use client"

import { ProductCategory } from "@/types/product";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";

export function SelectFilter({
  categories,
  onSelectCategory,
  disabled = false,
}: {
  categories: ProductCategory[],
  onSelectCategory: (selectedValue: string) => void,
  disabled?: boolean,
}) {
  const [activeCategory, setActiveCategory] = useState<string>("");

  function onChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setActiveCategory(e.target.value);
    onSelectCategory(e.target.value);
  }

  return (
    <>
      <div className="relative w-full min-[512px]:w-fit">
        <select
          id="category"
          name="category"
          value={activeCategory}
          onChange={onChangeCategory}
          disabled={disabled}
          className="min-h-10 w-full min-[512px]:min-w-48 appearance-none rounded-full bg-porcelain px-4 pr-10 text-sm font-medium text-obsidian disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <FontAwesomeIcon size="xs" icon={faChevronDown} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-obsidian" />
      </div>
    </>
  )
}