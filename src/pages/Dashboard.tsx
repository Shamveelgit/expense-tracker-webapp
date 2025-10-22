import { useState, useEffect } from 'react'
import { getExpenses, getBudgets, calculateBudgetSpent } from '../lib/storage'
import { getCategoryIcon } from '../components/Expense'
import { Plus, MoreVertical, ChevronDown, Search, X } from 'lucide-react'
import AddExpenseModal from '../components/AddExpenseModal'

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'category'

interface Budget {
  id: string
  title: string
  total: number
  spent: number
  date: string
}

function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [greeting, setGreeting] = useState('')
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [totalBalance, setTotalBalance] = useState({ requested: 0, unexecuted: 0 })
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    loadData()

    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const loadData = () => {
    // Get all expenses (show all on dashboard)
    const allExpenses = getExpenses()
    const sorted = allExpenses.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setExpenses(sorted)

    // Get budgets
    const allBudgets = getBudgets()
    const budgetsWithSpent = allBudgets.map(budget => ({
      ...budget,
      spent: calculateBudgetSpent(budget.title)
    }))
    setBudgets(budgetsWithSpent.slice(0, 3)) // Show top 3 budgets

    // Calculate total balance
    const totalAllocated = allBudgets.reduce((sum, b) => sum + b.total, 0)
    const totalSpent = allExpenses.reduce((sum, e) => sum + e.amount, 0)
    setTotalBalance({
      requested: totalAllocated,
      unexecuted: totalAllocated - totalSpent
    })
  }

  // Sort expenses
  const sortedExpenses = [...expenses].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'amount-desc':
        return b.amount - a.amount
      case 'amount-asc':
        return a.amount - b.amount
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })

  // Filter expenses by search query
  const filteredExpenses = sortedExpenses.filter(expense => 
    expense.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.budget.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'amount-desc', label: 'Highest Amount' },
    { value: 'amount-asc', label: 'Lowest Amount' },
    { value: 'category', label: 'Category' },
  ]

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {greeting}, Shamveel 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Take a look at your current balance 👀
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Left Section - Circular Chart & Add Expense */}
          <div className="md:col-span-4 space-y-4 md:space-y-6">
            {/* Circular Chart Card */}
            <div className="bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
              <p className="text-xs md:text-sm font-medium text-muted-foreground mb-4 md:mb-6 text-center">Total Balance</p>
              
              {/* Circular Progress Chart */}
              <div className="relative w-full aspect-square max-w-[200px] md:max-w-[280px] mx-auto mb-4 md:mb-6">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
                  {/* Background Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="none"
                    className="text-muted/10"
                  />
                  {/* Expense Arc (Blue) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="url(#blueGradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 85}`}
                    strokeDashoffset={`${2 * Math.PI * 85 * (1 - ((totalBalance.requested - totalBalance.unexecuted) / totalBalance.requested) * 0.65)}`}
                    className="transition-all duration-1000"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
                  />
                  {/* Savings Arc (Yellow) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="url(#yellowGradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 85}`}
                    strokeDashoffset={`${2 * Math.PI * 85 * (0.35 + ((totalBalance.requested - totalBalance.unexecuted) / totalBalance.requested) * 0.65)}`}
                    className="transition-all duration-1000"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(250, 204, 21, 0.3))' }}
                  />
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Total</p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">₹{(totalBalance.requested / 1000).toFixed(1)}K</p>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
                    <span className="text-xs md:text-sm text-muted-foreground">Spent</span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-foreground">₹{((totalBalance.requested - totalBalance.unexecuted) / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                    <span className="text-xs md:text-sm text-muted-foreground">Remaining</span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-foreground">₹{(totalBalance.unexecuted / 1000).toFixed(1)}K</span>
                </div>
              </div>

              {/* Add Expense Button */}
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Add a New Expense
              </button>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 gap-2 md:gap-3">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Total Income</p>
                    <p className="text-lg md:text-xl font-bold text-green-600">₹{(totalBalance.requested / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="p-2 md:p-2.5 bg-green-500/10 rounded-lg border border-green-500/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/20 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Total Expenses</p>
                    <p className="text-lg md:text-xl font-bold text-red-600">₹{((totalBalance.requested - totalBalance.unexecuted) / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="p-2 md:p-2.5 bg-red-500/10 rounded-lg border border-red-500/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Total Savings</p>
                    <p className="text-lg md:text-xl font-bold text-blue-600">₹{(totalBalance.unexecuted / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="p-2 md:p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Budgets & Expenses */}
          <div className="md:col-span-8 space-y-4 md:space-y-6">
            {/* Current Budgets */}
            <div>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-foreground">Your Current Budgets</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {budgets.map((budget) => {
                  const percentage = (budget.spent / budget.total) * 100
                  const remaining = budget.total - budget.spent
                  
                  return (
                    <div
                      key={budget.id}
                      className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-4 hover:shadow-md transition-shadow relative"
                    >
                      <div className="flex items-start justify-between mb-2 md:mb-3">
                        <h3 className="text-xs md:text-sm font-semibold text-foreground">{budget.title}</h3>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreVertical className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Spent</p>
                            <p className="text-base md:text-lg font-bold text-blue-600">₹{(budget.spent / 1000).toFixed(1)}K</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Remaining</p>
                            <p className="text-base md:text-lg font-bold text-yellow-600">₹{(remaining / 1000).toFixed(1)}K</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{budget.date}</span>
                          <span className="text-xs font-semibold text-foreground px-1.5 md:px-2 py-0.5 bg-accent border border-border rounded-md">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Expenses Table */}
            <div className="bg-card border border-border rounded-lg md:rounded-xl overflow-hidden">
              <div className="p-3 md:p-4 lg:p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                  <h2 className="text-base md:text-lg lg:text-xl font-bold text-foreground">Your Expenses</h2>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    {/* Search Bar */}
                    <div className={`flex items-center gap-2 transition-all duration-300 ${isSearchOpen ? 'w-full sm:w-64' : 'w-auto'}`}>
                      {isSearchOpen ? (
                        <div className="flex items-center gap-2 w-full bg-background border border-border rounded-lg px-3 py-1.5 md:py-2">
                          <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search expenses..."
                            className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm text-foreground placeholder:text-muted-foreground min-w-0"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              setIsSearchOpen(false)
                              setSearchQuery('')
                            }}
                            className="p-0.5 hover:bg-accent rounded transition-colors flex-shrink-0"
                          >
                            <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsSearchOpen(true)}
                          className="p-1.5 md:p-2 hover:bg-accent rounded-md md:rounded-lg transition-colors border border-border"
                        >
                          <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>

                    {/* Sort Dropdown */}
                    {!isSearchOpen && (
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 hover:bg-accent rounded-md md:rounded-lg transition-colors border border-border text-xs md:text-sm"
                        >
                          <span className="text-muted-foreground hidden sm:inline">Sort:</span>
                          <span className="text-foreground">{currentSortLabel}</span>
                          <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setIsDropdownOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden">
                              {sortOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setSortBy(option.value as SortOption)
                                    setIsDropdownOpen(false)
                                  }}
                                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors ${
                                    sortBy === option.value
                                      ? 'bg-primary text-primary-foreground'
                                      : 'text-foreground hover:bg-accent'
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

          {/* Desktop/Tablet Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-accent/30">
                  <th className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-accent/50 transition-colors">
                    <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-accent rounded-md md:rounded-lg border border-border">
                          {getCategoryIcon(expense.category)}
                        </div>
                        <span className="text-xs md:text-sm font-medium text-foreground">{expense.company}</span>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="text-xs md:text-sm text-foreground">{expense.budget}</span>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="text-xs md:text-sm text-muted-foreground">{expense.date}</span>
                    </td>
                    <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="text-xs md:text-sm font-semibold text-foreground">₹{expense.amount.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-border">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="p-3 hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <div className="p-1.5 bg-accent rounded-md border border-border flex-shrink-0">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-foreground truncate">{expense.company}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{expense.budget}</p>
                      <span className="text-xs text-muted-foreground mt-0.5 block">{expense.date}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">₹{expense.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onExpenseAdded={loadData}
      />
    </div>
  )
}

export default Dashboard
