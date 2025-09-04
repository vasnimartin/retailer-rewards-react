// Reward points: 2 pts per whole dollar over 100, plus 1 pt per whole dollar between 50–100.
// Fractions don't count.
export function calculatePoints(amount) {
  const dollars = Math.floor(Number(amount) || 0);
  const over100 = dollars > 100 ? (dollars - 100) * 2 : 0;
  const between50And100 = dollars > 50 ? Math.min(dollars, 100) - 50 : 0;
  return over100 + between50And100;
}