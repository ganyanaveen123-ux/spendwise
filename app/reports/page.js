
"use client";

import { useExpenses } from "../context/ExpenseContext";

export default function ReportsPage() {
  const { transactions, loaded } = useExpenses();

  if (!loaded) {
    return <p>Loading reports...</p>;
  }

  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  const categoryTotals = expenses.reduce((result, item) => {
    result[item.category] =
      (result[item.category] || 0) + item.amount;

    return result;
  }, {});

  const categoryBreakdown = Object.entries(categoryTotals);

  return (
    <main className="dashboard">
      <section className="transactions">
        <h1>Expense Reports</h1>
        <p>Understand where your money is going.</p>

        <h2>
          Total Expenses: ₹
          {totalExpenses.toLocaleString("en-IN")}
        </h2>

        {categoryBreakdown.length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          categoryBreakdown.map(([name, value]) => {
            const percentage =
              totalExpenses > 0
                ? (value / totalExpenses) * 100
                : 0;

            return (
              <div className="category-item" key={name}>
                <div className="category-heading">
                  <strong>{name}</strong>
                  <span>₹{value.toLocaleString("en-IN")}</span>
                </div>

                <div className="progress-background">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <small>
                  {percentage.toFixed(1)}% of total expenses
                </small>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
