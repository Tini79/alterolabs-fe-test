"use client"

import { SelectFilter } from "../ui/select-filter";
import { useState } from "react";
import type { FormEvent } from "react";
import type { ProductCategory } from "@/types/product";
import { Button } from "../ui/button";

export function CategoryFilter({
  categories,
  onClickButton,
  disabled = false,
}: {
  categories: ProductCategory[];
  onClickButton: (selectedValue: string) => void;
  disabled?: boolean;
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
    <form onSubmit={handleSubmit} className="w-full flex gap-3 mb-4">
      <SelectFilter
        categories={categories}
        onSelectCategory={onChangeCategory}
        disabled={disabled}
      />
      <Button type="submit" name="Apply" disabled={disabled} />
    </form>
  );
}