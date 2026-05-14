// Return the sum of 1 to n
export default function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    // Both these references search up to find the closest declaration
    total += i;
  }
  return total;
}
