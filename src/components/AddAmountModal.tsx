import { useState } from 'react'
import { X, Plus } from 'lucide-react'

interface AddAmountModalProps {
  isOpen: boolean
  onClose: () => void
  onAddAmount: (amount: number) => void
  budgetTitle: string
  currentTotal: number
}

function AddAmountModal({ isOpen, onClose, onAddAmount, budgetTitle, currentTotal }: AddAmountModalProps) {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount) {
      alert('Please enter an amount')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount greater than 0')
      return
    }

    onAddAmount(amountNum)
    setAmount('')
    onClose()
  }

  const handleClose = () => {
    setAmount('')
    onClose()
  }

  if (!isOpen) return null

  const newTotal = amount ? currentTotal + parseFloat(amount || '0') : currentTotal

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full border-2 border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add to Budget</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Budget Name</p>
            <p className="text-lg font-semibold text-foreground">{budgetTitle}</p>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Current Budget</p>
            <p className="text-2xl font-bold text-foreground">₹{currentTotal.toLocaleString()}</p>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
              Amount to Add (₹) *
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
              autoFocus
            />
          </div>

          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
            <div className="p-4 bg-chart-4/10 border border-chart-4/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">New Budget Total</p>
              <p className="text-2xl font-bold text-chart-4">₹{newTotal.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                +₹{parseFloat(amount).toLocaleString()} increase
              </p>
            </div>
          )}

          <div className="p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Tip:</span> Add funds to increase your budget limit for this category.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Amount
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAmountModal
