import { useEffect, useMemo, useState } from "react";
import { fetchTransactions } from "./services/mockApi";
import Filters from "./components/Filters";
import Summary from "./components/Summary";
import Banner from "./components/Banner";
import "./app.css";

export default function App() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customers = useMemo(() => {
    return Array.from(new Set(txns.map(t => t.customerId))).sort();
  }, [txns]);

  // Pick defaults that make sense with the data
  const [customerId, setCustomerId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthValue, setMonthValue] = useState("LAST_3");

  const years = useMemo(() => {
    const ys = Array.from(new Set(txns.map(t => new Date(t.date).getFullYear()))).sort((a,b) => b - a);
    return ys.length ? ys : [new Date().getFullYear()];
  }, [txns]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchTransactions();
        if (!mounted) return;
        setTxns(data);
        setError("");
        setLoading(false);

        // set defaults after data arrives
        const cs = Array.from(new Set(data.map(t => t.customerId))).sort();
        setCustomerId(cs[0] || "");
        const ys = Array.from(new Set(data.map(t => new Date(t.date).getFullYear()))).sort((a,b)=>b-a);
        setYear(ys[0] || new Date().getFullYear());
      } catch (e) {
        if (!mounted) return;
        setError(e.message || "Failed to load");
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const mine = useMemo(
    () => txns.filter(t => t.customerId === customerId),
    [txns, customerId]
  );

  return (
    <div className="container">
      <header className="app-header">
        <h1>Retailer <span className="accent">Rewards</span></h1>
      </header>

      <section className="card">
        <Filters
          customers={customers}
          years={years}
          selectedCustomer={customerId}
          selectedYear={year}
          selectedMonth={monthValue}
          onCustomer={setCustomerId}
          onYear={setYear}
          onMonth={setMonthValue}
        />
        <Banner loading={loading} error={error} />
        {!loading && !error && (
          <Summary txns={mine} selectedYear={year} monthValue={monthValue} />
        )}
      </section>
    </div>
  );
}
