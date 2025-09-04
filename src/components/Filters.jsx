export default function Filters({
  customers,
  years,
  selectedCustomer,
  selectedYear,
  selectedMonth,     // "LAST_3" or "1".."12"
  onCustomer,
  onYear,
  onMonth
}) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <label>
        Customer:&nbsp;
        <select value={selectedCustomer} onChange={e => onCustomer(e.target.value)}>
          {customers.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label>
        Year:&nbsp;
        <select value={selectedYear} onChange={e => onYear(Number(e.target.value))}>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </label>

      <label>
        Month:&nbsp;
        <select value={selectedMonth} onChange={e => onMonth(e.target.value)}>
          <option value="LAST_3">Last 3 months</option>
          <option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option>
          <option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option>
          <option value="7">Jul</option><option value="8">Aug</option><option value="9">Sep</option>
          <option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>
        </select>
      </label>
    </div>
  );
}
