export function ProductDiscount({
  discountPercentage,
}: {
  discountPercentage?: number;
}) {
  if (!discountPercentage || discountPercentage <= 0) {
    return null;
  }

  return (
    <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-[10px] font-semibold text-red-600">
      {Math.round(discountPercentage)}% OFF
    </span>
  );
}