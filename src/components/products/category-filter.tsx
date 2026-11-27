"use client"

import { SelectFilter } from "../ui/select-filter";
import { useState } from "react";
import { ProductCategory } from "@/types/product";

export async function CategoryFilter({
  categories,
  onClickButton
}: {
  categories: ProductCategory[]
  onClickButton: (selectedValue: string)=>void
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  function handleOnClick(){
    onClickButton(selectedCategory)
  }

  function onChangeCategory(category: string){
    setSelectedCategory(category)
  }

  return (
    <form action="/" className="flex items-center gap-3">
      <SelectFilter categories={categories} onSelectCategory={category => onChangeCategory(category)} />
      {/* TODO: use button component */}
      <button
      onClick={handleOnClick}
        type="submit"
        className="min-h-10 rounded-full bg-[#f1f2f5] px-4 text-sm font-medium text-[#111827] transition-colors hover:bg-[#e6e8ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
      >
        Apply
      </button>
    </form>
  );
}