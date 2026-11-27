"use client"

import { SelectFilter } from "../ui/select-filter";
import { useState } from "react";
import type { FormEvent } from "react";
import type { ProductCategory } from "@/types/product";
import { Button } from "../ui/button";

export function CategoryFilter({
  categories,
  onClickButton
}: {
  categories: ProductCategory[]
  onClickButton: (selectedValue: string)=>void
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClickButton(selectedCategory)
  }

  function onChangeCategory(category: string){
    setSelectedCategory(category)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <SelectFilter categories={categories} onSelectCategory={category => onChangeCategory(category)} />
      {/* TODO: use button component */}
      {/* <button
        type="submit"
        className=""
      >
        Apply
      </button> */}
      <Button type="submit" name="Apply" />
    </form>
  );
}