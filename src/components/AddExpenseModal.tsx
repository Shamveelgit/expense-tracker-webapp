import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { saveExpense, getBudgets } from '../lib/storage'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onExpenseAdded: () => void
}

const categories = ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 'Shopping', 'Gifts', 'Other'] as const

function AddExpenseModal({ isOpen, onClose, onExpenseAdded }: AddExpenseModalProps) {
  const [company, setCompany] = useState('')
  const [budget, setBudget] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<typeof categories[number]>('Food')
  const [budgets, setBudgets] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      const loadedBudgets = getBudgets()
      setBudgets(loadedBudgets.map(b => b.title))
      if (loadedBudgets.length > 0) {
        setBudget(loadedBudgets[0].title)
      }
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!company || !budget || !amount) {
      alert('Please fill in all required fields')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount')
      return
    }

    // Format date as DD/MM/YY
    const [year, month, day] = date.split('-')
    const formattedDate = `${day}/${month}/${year.slice(2)}`

    saveExpense({
      company,
      budget,
      date: formattedDate,
      amount: amountNum,
      category
    })

    // Reset form
    setCompany('')
    setAmount('')
    setDate(new Date().toISOString().split('T')[0])
    setCategory('Food')
    
    onExpenseAdded()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full border-2 border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add New Expense</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
              Company/Description *
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="Enter company name"
              required
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
              Budget *
            </label>
            <select
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              required
            >
              {budgets.length === 0 ? (
                <option>No budgets available</option>
              ) : (
                budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof categories[number])}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
              Amount (₹) *
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddExpenseModal
