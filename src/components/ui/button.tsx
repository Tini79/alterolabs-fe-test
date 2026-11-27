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
      className={`min-h-10 rounded-full bg-obsidian px-4 text-sm font-medium text-porcelain transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >{name}</button>
  );
}
