const DELAY_MS = 600;        // tweak if you want to show loading
const FAIL_RATE = 0;         // set to 0.05 to demo error state

export async function fetchTransactions() {
  // pretend network
  await new Promise(r => setTimeout(r, DELAY_MS));
  if (Math.random() < FAIL_RATE) throw new Error("Network error (simulated)");

  // served from /public at runtime
  const res = await fetch("/transactions.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
