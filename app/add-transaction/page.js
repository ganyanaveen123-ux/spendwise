
"use client";

import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function AddTransactionPage() {
  const { addTransaction } = useExpenses();

  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(today);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter valid transaction details.");
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      date,
    });

    alert("Transaction added successfully!");

    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("expense");
    setDate(today);
  }

  return (
    <main className="dashboard">
      <section className="add-transaction">
        <h1>Add Transaction</h1>
        <p>Record your income and daily expenses.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter description"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Pocket Money">Pocket Money</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Transaction Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit">Save Transaction</button>
        </form>
      </section>
    </main>
  );
}
