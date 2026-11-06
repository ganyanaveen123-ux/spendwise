
"use client";

import { useEffect, useState } from "react";

export default function BudgetCard({ transactions }) {
  const [budget, setBudget] = useState("5000");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedBudget = localStorage.getItem("spendwise-monthly-budget");

    if (savedBudget) {
      setBudget(savedBudget);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("spendwise-monthly-budget", budget);
    }
  }, [budget, loaded]);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpenses = transactions
    .filter(
      (item) =>
        item.type === "expense" &&
        item.date.startsWith(currentMonth)
    )
    .reduce((total, item) => total + item.amount, 0);

  const budgetAmount = Number(budget) || 0;
  const remaining = budgetAmount - monthlyExpenses;

  const percentage =
    budgetAmount > 0
      ? Math.min((monthlyExpenses / budgetAmount) * 100, 100)
      : 0;

  if (!loaded) return null;

  return (
    <section className="budget-card">
      <h2>Monthly Budget</h2>

      <label>Set your monthly budget (₹)</label>
      <input
        type="number"
        min="1"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <p>Monthly expenses: ₹{monthlyExpenses.toLocaleString("en-IN")}</p>
      <p>
        Remaining budget: ₹{remaining.toLocaleString("en-IN")}
      </p>

      <div className="progress-background">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p>
        {budgetAmount === 0
          ? "Enter a budget to track your spending."
          : remaining < 0
          ? "You have exceeded your monthly budget."
          : percentage >= 80
          ? "You're getting close to your budget limit."
          : "You're within your monthly budget."}
      </p>
    </section>
  );
}
