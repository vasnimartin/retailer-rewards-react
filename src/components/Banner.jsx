export default function Banner({ loading, error }) {
  if (loading) return <div style={{ padding: 8 }}>Loading…</div>;
  if (error) return <div style={{ color: "#b00020", fontWeight: 600 }}>{error}</div>;
  return null;
}
