import { useState, useEffect } from 'react'
import { Plus, ChevronDown, Download, Search, X } from 'lucide-react'
import { getExpenses, type Expense as ExpenseType } from '../lib/storage'
import { getCategoryIcon } from '../components/Expense'
import AddExpenseModal from '../components/AddExpenseModal'

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'category'

function Expenses() {
  const [expenses, setExpenses] = useState<ExpenseType[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = () => {
    setExpenses(getExpenses())
  }

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

  const exportToCSV = () => {
    if (filteredExpenses.length === 0) {
      alert('No expenses to export')
      return
    }

    // Create CSV headers
    const headers = ['Company', 'Budget', 'Date', 'Category', 'Amount']
    
    // Create CSV rows
    const rows = filteredExpenses.map(expense => [
      expense.company,
      expense.budget,
      expense.date,
      expense.category,
      expense.amount.toString()
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <div className="w-1 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-primary to-chart-1 rounded-full flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground truncate">Expenses</h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground ml-4 sm:ml-5 md:ml-7">Manage and track all your expenses</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base font-medium shadow-lg hover:shadow-xl flex-shrink-0"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Add Expense</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs sm:text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredExpenses.length}</span> expenses
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className={`flex items-center gap-2 transition-all duration-300 ${isSearchOpen ? 'flex-1 sm:w-64' : 'w-auto'}`}>
              {isSearchOpen ? (
                <div className="flex items-center gap-2 w-full bg-card border border-border rounded-lg px-3 py-1.5 md:py-2">
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search expenses..."
                    className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground min-w-0"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }}
                    className="p-0.5 hover:bg-accent rounded transition-colors flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 sm:p-2 hover:bg-accent rounded-lg transition-colors border border-border"
                  title="Search expenses"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Export Button - Only show when search is closed */}
            {!isSearchOpen && (
              <button
                onClick={exportToCSV}
                disabled={filteredExpenses.length === 0}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium justify-center"
                title="Export to CSV"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                <span className="text-foreground hidden sm:inline">Export CSV</span>
              </button>
            )}

            {/* Sort Dropdown - Only show when search is closed */}
            {!isSearchOpen && (
              <div className="relative flex-1 sm:flex-initial">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border border-border rounded-lg hover:bg-accent transition duration-200"
                >
                  <span className="text-xs sm:text-sm text-foreground truncate">
                    <span className="hidden sm:inline">Sort: </span>{currentSortLabel}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
            
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
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

        {/* Expenses List */}
        {filteredExpenses.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-lg p-8 sm:p-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              {searchQuery ? `No expenses found for "${searchQuery}"` : 'No expenses yet'}
            </p>
            {!searchQuery && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base font-medium"
              >
                Add Your First Expense
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop/Tablet Table View */}
            <div className="hidden sm:block bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">Company</th>
                      <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">Budget</th>
                      <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-right py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {filteredExpenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-accent transition-colors duration-150">
                        <td className="py-2.5 md:py-3 px-3 md:px-4">
                          <span className="text-sm md:text-base font-medium text-foreground">{expense.company}</span>
                        </td>
                        <td className="py-2.5 md:py-3 px-3 md:px-4">
                          <span className="text-xs md:text-sm text-muted-foreground">{expense.budget}</span>
                        </td>
                        <td className="py-2.5 md:py-3 px-3 md:px-4">
                          <span className="text-xs md:text-sm text-muted-foreground">{expense.date}</span>
                        </td>
                        <td className="py-2.5 md:py-3 px-3 md:px-4">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <div className="scale-75 md:scale-100">
                              {getCategoryIcon(expense.category)}
                            </div>
                            <span className="text-xs md:text-sm text-foreground">{expense.category}</span>
                          </div>
                        </td>
                        <td className="py-2.5 md:py-3 px-3 md:px-4 text-right">
                          <span className="text-sm md:text-base font-semibold text-foreground">₹{expense.amount.toLocaleString()}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="bg-card rounded-lg shadow-sm border border-border p-3 hover:bg-accent transition-colors duration-150">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className="p-1.5 bg-accent rounded-lg border border-border flex-shrink-0">
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">{expense.company}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{expense.budget}</p>
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground flex-shrink-0 ml-2">₹{expense.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2.5 border-t border-border">
                    <span className="text-xs px-2 py-0.5 bg-accent border border-border rounded-md text-muted-foreground">{expense.category}</span>
                    <span className="text-xs text-muted-foreground">{expense.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExpenseAdded={loadExpenses}
      />
    </div>
  )
}

export default Expenses
