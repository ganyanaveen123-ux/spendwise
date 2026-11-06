
"use client";

import { useExpenses } from "./context/ExpenseContext";
import SummaryCard from "./components/SummaryCard";

export default function Home() {
  const { transactions, loaded } = useExpenses();

  if (!loaded) {
    return <p>Loading SpendWise...</p>;
  }

  const currentMonth = new Date().toISOString().slice(0, 7);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const monthlyIncome = transactions
    .filter(
      (item) =>
        item.type === "income" &&
        item.date.startsWith(currentMonth)
    )
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const monthlyExpenses = transactions
    .filter(
      (item) =>
        item.type === "expense" &&
        item.date.startsWith(currentMonth)
    )
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = income - expenses;

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to SpendWise!</h1>
        <p>Track your money. Manage it wisely.</p>
      </div>

      <section className="dashboard-section">
        <h2>Financial Overview</h2>

        <div className="summary">
          <SummaryCard title="Total Balance" value={balance} />
          <SummaryCard title="Total Income" value={income} />
          <SummaryCard title="Total Expenses" value={expenses} />
          <SummaryCard
            title="Total Transactions"
            value={transactions.length}
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Monthly Overview</h2>

        <div className="summary">
          <SummaryCard
            title="This Month's Income"
            value={monthlyIncome}
          />
          <SummaryCard
            title="This Month's Expenses"
            value={monthlyExpenses}
          />
        </div>
      </section>
    </main>
  );
}
