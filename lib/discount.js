export function getDiscount(beforePrice, discount) {
  return (beforePrice * (1 - discount / 100)).toFixed(0)
}