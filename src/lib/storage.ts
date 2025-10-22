// Storage utility functions for managing expenses and budgets in localStorage

export interface Expense {
  id: string
  company: string
  budget: string
  date: string
  amount: number
  category: 'Food' | 'Transport' | 'Housing' | 'Utilities' | 'Entertainment' | 'Health' | 'Shopping' | 'Gifts' | 'Other'
  createdAt: string
}

export interface Budget {
  id: string
  title: string
  total: number
  spent: number
  date: string
  createdAt: string
}

// Expense Storage Functions
export const getExpenses = (): Expense[] => {
  const expenses = localStorage.getItem('expenses')
  return expenses ? JSON.parse(expenses) : []
}

export const saveExpense = (expense: Omit<Expense, 'id' | 'createdAt'>): Expense => {
  const expenses = getExpenses()
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  expenses.push(newExpense)
  localStorage.setItem('expenses', JSON.stringify(expenses))
  return newExpense
}

export const deleteExpense = (id: string): void => {
  const expenses = getExpenses()
  const filtered = expenses.filter(exp => exp.id !== id)
  localStorage.setItem('expenses', JSON.stringify(filtered))
}

export const updateExpense = (id: string, updates: Partial<Expense>): void => {
  const expenses = getExpenses()
  const updated = expenses.map(exp => 
    exp.id === id ? { ...exp, ...updates } : exp
  )
  localStorage.setItem('expenses', JSON.stringify(updated))
}

// Budget Storage Functions
export const getBudgets = (): Budget[] => {
  const budgets = localStorage.getItem('budgets')
  return budgets ? JSON.parse(budgets) : []
}

export const saveBudget = (budget: Omit<Budget, 'id' | 'spent' | 'createdAt'>): Budget => {
  const budgets = getBudgets()
  const newBudget: Budget = {
    ...budget,
    id: Date.now().toString(),
    spent: 0,
    createdAt: new Date().toISOString()
  }
  budgets.push(newBudget)
  localStorage.setItem('budgets', JSON.stringify(budgets))
  return newBudget
}

export const deleteBudget = (id: string): void => {
  const budgets = getBudgets()
  const filtered = budgets.filter(budget => budget.id !== id)
  localStorage.setItem('budgets', JSON.stringify(filtered))
}

export const updateBudget = (id: string, updates: Partial<Budget>): void => {
  const budgets = getBudgets()
  const updated = budgets.map(budget => 
    budget.id === id ? { ...budget, ...updates } : budget
  )
  localStorage.setItem('budgets', JSON.stringify(updated))
}

// Add amount to existing budget
export const addAmountToBudget = (id: string, additionalAmount: number): void => {
  const budgets = getBudgets()
  const updated = budgets.map(budget => 
    budget.id === id ? { ...budget, total: budget.total + additionalAmount } : budget
  )
  localStorage.setItem('budgets', JSON.stringify(updated))
}

// Calculate total spent for a budget
export const calculateBudgetSpent = (budgetTitle: string): number => {
  const expenses = getExpenses()
  return expenses
    .filter(exp => exp.budget === budgetTitle)
    .reduce((total, exp) => total + exp.amount, 0)
}
