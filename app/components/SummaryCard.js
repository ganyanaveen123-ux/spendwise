
export default function SummaryCard({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <h2>₹{value.toLocaleString("en-IN")}</h2>
    </div>
  );
}
