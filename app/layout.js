
import { ExpenseProvider } from "./context/ExpenseContext";
import Navbar from "./components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SpendWise",
  description: "Student Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ExpenseProvider>
          <Navbar />
          {children}
        </ExpenseProvider>
      </body>
    </html>
  );
}
