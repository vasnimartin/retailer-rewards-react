import { calculatePoints } from "../lib/rewards";
import { toMonthKey, monthLabel, last3WithinYear } from "../lib/date";

export default function Summary({ txns, selectedYear, monthValue }) {
  // LAST_3 mode
  if (monthValue === "LAST_3") {
    const keys = last3WithinYear(txns, selectedYear); // ["YYYY-MM", ...]
    const set = new Set(keys);
    const bucket = new Map(keys.map(k => [k, 0]));

    for (const t of txns) {
      const { key, year } = toMonthKey(t.date);
      if (year === selectedYear && set.has(key)) {
        bucket.set(key, bucket.get(key) + calculatePoints(t.amount));
      }
    }

    const total = [...bucket.values()].reduce((a, b) => a + b, 0);

    return (
      <div>
        <h3>Last 3 Months{keys.length ? ` (ending ${monthLabel(keys[keys.length - 1])})` : ""}</h3>
        <table>
          <thead><tr><th>Month</th><th>Points</th></tr></thead>
          <tbody>
            {keys.map(k => (
              <tr key={k}><td>{monthLabel(k)}</td><td>{bucket.get(k) || 0}</td></tr>
            ))}
            {keys.length === 0 && <tr><td colSpan={2}>No transactions in {selectedYear}</td></tr>}
          </tbody>
        </table>
        <div style={{ marginTop: 8 }}><strong>Total Points:</strong> {total}</div>
      </div>
    );
  }

  // Specific month mode ("1".."12")
  const monthNum = Number(monthValue);
  const rows = txns
    .filter(t => {
      const { year, month } = toMonthKey(t.date);
      return year === selectedYear && month === monthNum;
    })
    .map(t => ({ ...t, points: calculatePoints(t.amount) }));

  const total = rows.reduce((s, r) => s + r.points, 0);

  return (
    <div>
      <h3>Month Details</h3>
      <table>
        <thead><tr><th>Date</th><th>Txn ID</th><th>Amount</th><th>Points</th></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={4}>No transactions</td></tr>}
          {rows.map(r => (
            <tr key={r.transactionId}>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.transactionId}</td>
              <td>${Number(r.amount).toFixed(2)}</td>
              <td>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 8 }}><strong>Total Points:</strong> {total}</div>
    </div>
  );
}
