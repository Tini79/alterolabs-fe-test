import type { ButtonHTMLAttributes } from "react";

export function Button({
  type = "button",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md border px-4 py-2 font-medium ${className}`}
      {...props}
    />
  );
}
