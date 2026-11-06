
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        SpendWise
      </Link>

      <div className="nav-links">
        <Link href="/">Dashboard</Link>
        <Link href="/transactions">Transactions</Link>
        <Link href="/add-transaction">Add Transaction</Link>
        <Link href="/reports">Reports</Link>
      </div>
    </nav>
  );
}
