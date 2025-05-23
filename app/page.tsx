"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CurrencySwitcher } from "@/components/currency-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { EditableValue } from "@/components/editable-value"

export default function Dashboard() {
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("English")

  // Financial metrics state
  const [totalRevenue, setTotalRevenue] = useState("183,834.94")
  const [netIncome, setNetIncome] = useState("80,489.94")
  const [infraExpenses, setInfraExpenses] = useState("3,834.94")

  // Transactions state
  const [transactions, setTransactions] = useState([
    { id: 1, amount: "50", name: "John Doe", email: "John@gmail.com", type: "Subscription" },
    { id: 2, amount: "50", name: "John Doe", email: "John@gmail.com", type: "Subscription" },
    { id: 3, amount: "50", name: "John Doe", email: "John@gmail.com", type: "Subscription" },
    { id: 4, amount: "50", name: "John Doe", email: "John@gmail.com", type: "Subscription" },
    { id: 5, amount: "50", name: "John Doe", email: "John@gmail.com", type: "Subscription" },
    { id: 6, amount: "50", name: "John Doe", email: "John@gmail.com", type: "Subscription" },
  ])

  // Currency symbols mapping
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
  }

  // Get current currency symbol
  const currencySymbol = currencySymbols[currency] || "$"

  // Update transaction amount
  const updateTransactionAmount = (id: number, newAmount: string) => {
    setTransactions(
      transactions.map((transaction) => (transaction.id === id ? { ...transaction, amount: newAmount } : transaction)),
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header with Currency and Language Switchers */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex mb-6 border-b">
        <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-t-lg font-medium">Overview</div>
        <div className="px-4 py-2 text-gray-600 dark:text-gray-300">Analytics</div>
        <div className="px-4 py-2 text-gray-600 dark:text-gray-300">Reports</div>
        <div className="px-4 py-2 text-gray-600 dark:text-gray-300">Docs</div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard
          title="Total Revenue"
          value={totalRevenue}
          currencySymbol={currencySymbol}
          onValueChange={setTotalRevenue}
        />
        <MetricCard title="Net Income" value={netIncome} currencySymbol={currencySymbol} onValueChange={setNetIncome} />
        <MetricCard
          title="Infra Expenses"
          value={infraExpenses}
          currencySymbol={currencySymbol}
          onValueChange={setInfraExpenses}
        />
      </div>

      {/* Transactions Section */}
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-4">Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              currencySymbol={currencySymbol}
              onAmountChange={(newAmount) => updateTransactionAmount(transaction.id, newAmount)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  currencySymbol: string
  onValueChange: (value: string) => void
}

function MetricCard({ title, value, currencySymbol, onValueChange }: MetricCardProps) {
  return (
    <Card className="border-2">
      <CardContent className="p-4">
        <h3 className="text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
        <EditableValue value={value} prefix={currencySymbol} onSave={onValueChange} className="text-3xl font-bold" />
      </CardContent>
    </Card>
  )
}

interface TransactionCardProps {
  transaction: {
    id: number
    amount: string
    name: string
    email: string
    type: string
  }
  currencySymbol: string
  onAmountChange: (newAmount: string) => void
}

function TransactionCard({ transaction, currencySymbol, onAmountChange }: TransactionCardProps) {
  return (
    <Card className="border">
      <CardContent className="p-4 flex items-start">
        <div className="mr-4">
          <EditableValue
            value={transaction.amount}
            prefix={currencySymbol}
            onSave={onAmountChange}
            className="text-3xl font-bold"
          />
          <p className="text-orange-500 text-sm">{transaction.type}</p>
        </div>
        <div>
          <p className="font-medium">{transaction.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{transaction.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}
