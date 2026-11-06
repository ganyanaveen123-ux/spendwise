
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ExpenseContext = createContext();

const defaultTransactions = [
  {
    id: 1,
    title: "Food",
    amount: 150,
    category: "Food",
    type: "expense",
    date: "2026-11-06",
  },
  {
    id: 2,
    title: "Travel",
    amount: 80,
    category: "Travel",
    type: "expense",
    date: "2026-11-06",
  },
  {
    id: 3,
    title: "Pocket Money",
    amount: 2000,
    category: "Pocket Money",
    type: "income",
    date: "2026-11-06",
  },
];

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved transactions from browser storage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("spendwise-transactions");

      if (savedData) {
        setTransactions(JSON.parse(savedData));
      } else {
        setTransactions(defaultTransactions);
      }
    } catch (error) {
      console.error("Unable to load transactions:", error);
      setTransactions(defaultTransactions);
    }

    setLoaded(true);
  }, []);

  // Save transactions whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "spendwise-transactions",
        JSON.stringify(transactions)
      );
    }
  }, [transactions, loaded]);

  function addTransaction(transaction) {
    setTransactions((previous) => [
      ...previous,
      { ...transaction, id: Date.now() },
    ]);
  }

  function deleteTransaction(id) {
    setTransactions((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        loaded,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
