// Turn an ISO date string into { year, month (1..12), key: "YYYY-MM" }
export function toMonthKey(dateStr) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const key = `${year}-${String(month).padStart(2, "0")}`;
  return { year, month, key };
}

// Format "YYYY-MM" into something like "Aug 2025"
export function monthLabel(key) {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString(undefined, {
    month: "short",
    year: "numeric",
  });
}

// Build up to last 3 months INSIDE the selected year.
// Anchor at the latest month in that year that has any transaction.
export function last3WithinYear(transactions, selectedYear) {
  const monthsInYear = transactions
    .map(t => toMonthKey(t.date))
    .filter(({ year }) => year === selectedYear)
    .map(({ month }) => month); // [1..12]

  if (monthsInYear.length === 0) return [];

  const anchor = Math.max(...monthsInYear);
  const start = Math.max(1, anchor - 2);

  const keys = [];
  for (let m = start; m <= anchor; m++) {
    keys.push(`${selectedYear}-${String(m).padStart(2, "0")}`);
  }
  return keys; // e.g. ["2025-06","2025-07","2025-08"]
}
