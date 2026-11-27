import type { ButtonHTMLAttributes } from "react";

export function Button({
  type = "button",
  name,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`min-h-10 rounded-full text-[#f1f2f5] px-4 text-sm font-medium bg-[#111827] transition-colors ${className}`}
      {...props}
    >{name}</button>
  );
}
