"use client"

import { ProductCategory } from "@/types/product";
import { ChangeEvent, useEffect, useState } from "react";

export function SelectFilter({
  categories,
  onSelectCategory
}: {
  categories: ProductCategory[],
  onSelectCategory: (selectedValue: string) => void
}){
  const [activeCategory, setActiveCategory] = useState<string>("");

  function onChangeCategory(e: ChangeEvent<HTMLSelectElement>){
    setActiveCategory(e.target.value);
    onSelectCategory(e.target.value);
  }

  return (
    <>
    <label htmlFor="category" className="sr-only">
        Select a product category
      </label>
      <select
        id="category"
        name="category"
        value={activeCategory}
        onChange={onChangeCategory}
        className="min-h-10 min-w-48 rounded-full border border-[#1f2937] text-[#1f2937] px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2937]"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  )
}