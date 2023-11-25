export function formatPrice(price: number | 0) {
  return price.toLocaleString("en-US", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
