export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
