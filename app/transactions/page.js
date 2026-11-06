
"use client";

import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function TransactionsPage() {
  const { transactions, deleteTransaction, loaded } = useExpenses();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  if (!loaded) {
    return <p>Loading transactions...</p>;
  }

  const filteredTransactions = transactions.filter((item) => {
    const matchesType =
      filter === "all" || item.type === filter;

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  }

  return (
    <main className="dashboard">
      <section className="transactions">
        <h1>Transactions</h1>
        <p>View and manage all your income and expenses.</p>

        <input
          className="search-input"
          type="text"
          placeholder="Search by description or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filters">
          <button type="button" onClick={() => setFilter("all")}>
            All
          </button>
          <button type="button" onClick={() => setFilter("income")}>
            Income
          </button>
          <button type="button" onClick={() => setFilter("expense")}>
            Expenses
          </button>
        </div>

        {filteredTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          filteredTransactions.map((item) => (
            <div className="transaction-row" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.category} | {item.date}</p>
              </div>

              <div className="transaction-actions">
                <strong>
                  {item.type === "income" ? "+" : "-"} ₹
                  {item.amount.toLocaleString("en-IN")}
                </strong>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
