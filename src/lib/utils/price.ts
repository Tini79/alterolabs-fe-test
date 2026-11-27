export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

export function getOriginalPrice(
  price: number,
  discountPercentage?: number,
): number | null {
  if (
    !discountPercentage ||
    discountPercentage <= 0 ||
    discountPercentage >= 100
  ) {
    return null;
  }

  return price;
}

export function getDiscountedPrice(
  price: number,
  discountPercentage?: number,
): number {
  if (
    !discountPercentage ||
    discountPercentage <= 0 ||
    discountPercentage >= 100
  ) {
    return price;
  }

  return price * (1 - discountPercentage / 100);
}
