import { useState, useEffect } from 'react'
import OverviewCard from './OverviewCard'
import { getExpenses } from '../lib/storage'

function Overview() {
  const [totalExpense, setTotalExpense] = useState(0)
  const fixedIncome = 150000 // Fixed income for now

  useEffect(() => {
    const expenses = getExpenses()
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    setTotalExpense(total)
  }, [])

  const totalSavings = fixedIncome - totalExpense
  const savingsPercentage = fixedIncome > 0 ? ((totalSavings / fixedIncome) * 100).toFixed(1) : '0'

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <div className="w-1 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-primary to-chart-1 rounded-full flex-shrink-0" />
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Financial Overview</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground ml-4 sm:ml-5 md:ml-7">Track your income, expenses, and savings at a glance</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
          <OverviewCard
            title="Total Income"
            amount={`₹${fixedIncome.toLocaleString()}`}
            change="+12.5%"
            changeType="increase"
            variant="income"
          />
          <OverviewCard
            title="Total Expense"
            amount={`₹${totalExpense.toLocaleString()}`}
            change="+8.2%"
            changeType="increase"
            variant="expense"
          />
          <OverviewCard
            title="Total Savings"
            amount={`₹${totalSavings.toLocaleString()}`}
            change={`${savingsPercentage}%`}
            changeType="increase"
            variant="savings"
          />
        </div>
      </div>
    </div>
  )
}

export default Overview