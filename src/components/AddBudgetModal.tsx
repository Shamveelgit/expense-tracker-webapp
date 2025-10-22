import { useState } from 'react'
import { X } from 'lucide-react'
import { saveBudget } from '../lib/storage'

interface AddBudgetModalProps {
  isOpen: boolean
  onClose: () => void
  onBudgetAdded: () => void
}

function AddBudgetModal({ isOpen, onClose, onBudgetAdded }: AddBudgetModalProps) {
  const [title, setTitle] = useState('')
  const [total, setTotal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !total) {
      alert('Please fill in all required fields')
      return
    }

    const totalNum = parseFloat(total)
    if (isNaN(totalNum) || totalNum <= 0) {
      alert('Please enter a valid amount')
      return
    }

    saveBudget({
      title,
      total: totalNum,
      date: 'October 2025'
    })

    // Reset form
    setTitle('')
    setTotal('')
    
    onBudgetAdded()
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
          <h2 className="text-2xl font-bold text-foreground">Create New Budget</h2>
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
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Budget Name *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="e.g., Monthly Groceries"
              required
            />
          </div>

          <div>
            <label htmlFor="total" className="block text-sm font-medium text-foreground mb-2">
              Budget Amount (₹) *
            </label>
            <input
              type="number"
              id="total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Tip:</span> Set realistic budgets based on your spending patterns to track your finances effectively.
            </p>
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
              Create Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBudgetModal
