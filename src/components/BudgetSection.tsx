import React, { useState } from 'react';

interface Budget {
  id: number;
  name: string;
  amount: number;
}

const BudgetSection: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const addBudget = () => {
    if (budgetName.trim() !== '' && budgetAmount.trim() !== '') {
      const newBudget: Budget = {
        id: Date.now(),
        name: budgetName,
        amount: parseFloat(budgetAmount),
      };
      setBudgets([...budgets, newBudget]);
      setBudgetName('');
      setBudgetAmount('');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-chart-2 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Budgets</h2>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Manage your budgets</p>
        </div>

        <div className="budget-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Add New Budget</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="budgetName" className="block text-sm font-medium text-muted-foreground">Budget Name</label>
                  <input
                    type="text"
                    id="budgetName"
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="budgetAmount" className="block text-sm font-medium text-muted-foreground">Amount</label>
                  <input
                    type="number"
                    id="budgetAmount"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <button
                  onClick={addBudget}
                  className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Add Budget
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Current Budgets</h3>
              <ul className="space-y-3">
                {budgets.map(budget => (
                  <li key={budget.id} className="bg-card p-4 rounded-md shadow flex justify-between items-center">
                    <span className="font-semibold text-foreground">{budget.name}</span>
                    <span className="text-muted-foreground">₹{budget.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSection;