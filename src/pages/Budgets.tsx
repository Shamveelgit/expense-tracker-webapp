import { useState, useEffect } from 'react'
import BudgetCard from '../components/BudgetCard'
import AddBudgetModal from '../components/AddBudgetModal'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import AddAmountModal from '../components/AddAmountModal'
import { Plus } from 'lucide-react'
import { getBudgets, calculateBudgetSpent, deleteBudget, addAmountToBudget } from '../lib/storage'

function Budgets() {
  const [budgets, setBudgets] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddAmountModalOpen, setIsAddAmountModalOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<any>(null)

  useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = () => {
    const loadedBudgets = getBudgets().map(budget => {
      const spent = calculateBudgetSpent(budget.title)
      const remaining = budget.total - spent
      const spentPercentage = budget.total > 0 ? Math.round((spent / budget.total) * 100) : 0
      
      return {
        id: budget.id,
        title: budget.title,
        total: `₹${budget.total.toLocaleString()}`,
        totalNum: budget.total,
        spent: `₹${spent.toLocaleString()}`,
        remaining: `₹${remaining.toLocaleString()}`,
        date: budget.date,
        spentPercentage
      }
    })
    setBudgets(loadedBudgets)
  }

  const handleDeleteBudget = (id: string) => {
    const budget = budgets.find(b => b.id === id)
    setSelectedBudget(budget)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (selectedBudget) {
      deleteBudget(selectedBudget.id)
      setIsDeleteModalOpen(false)
      setSelectedBudget(null)
      loadBudgets()
    }
  }

  const handleAddAmount = (id: string) => {
    const budget = budgets.find(b => b.id === id)
    setSelectedBudget(budget)
    setIsAddAmountModalOpen(true)
  }

  const confirmAddAmount = (amount: number) => {
    if (selectedBudget) {
      addAmountToBudget(selectedBudget.id, amount)
      setIsAddAmountModalOpen(false)
      setSelectedBudget(null)
      loadBudgets()
    }
  }

  const totalAllocated = budgets.reduce((sum, b) => 
    sum + parseFloat(b.total.replace(/[₹,]/g, '')), 0
  )
  const totalSpent = budgets.reduce((sum, b) => 
    sum + parseFloat(b.spent.replace(/[₹,]/g, '')), 0
  )
  const totalRemaining = totalAllocated - totalSpent

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-chart-1 rounded-full" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Budget Management</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-7">Create and monitor your monthly budgets</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>New Budget</span>
          </button>
        </div>

        {/* Summary Section */}
        {budgets.length > 0 && (
          <div className="mb-8 p-6 bg-card border border-border rounded-lg">
            <h3 className="text-base font-semibold text-foreground mb-4">Budget Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="text-center p-4 bg-accent/30 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Total Allocated</p>
                <p className="text-2xl font-bold text-foreground">₹{totalAllocated.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-accent/30 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Total Spent</p>
                <p className="text-2xl font-bold text-chart-1">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-accent/30 border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Remaining</p>
                <p className="text-2xl font-bold text-chart-4">₹{totalRemaining.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Budget Cards Grid */}
        {budgets.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-4">No budgets yet</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Create Your First Budget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                id={budget.id}
                title={budget.title}
                total={budget.total}
                spent={budget.spent}
                remaining={budget.remaining}
                date={budget.date}
                spentPercentage={budget.spentPercentage}
                onAddAmount={handleAddAmount}
                onDelete={handleDeleteBudget}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Budget Modal */}
      <AddBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBudgetAdded={loadBudgets}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedBudget(null)
        }}
        onConfirm={confirmDelete}
        budgetTitle={selectedBudget?.title || ''}
      />

      {/* Add Amount Modal */}
      <AddAmountModal
        isOpen={isAddAmountModalOpen}
        onClose={() => {
          setIsAddAmountModalOpen(false)
          setSelectedBudget(null)
        }}
        onAddAmount={confirmAddAmount}
        budgetTitle={selectedBudget?.title || ''}
        currentTotal={selectedBudget?.totalNum || 0}
      />
    </div>
  )
}

export default Budgets
