import { useState } from 'react'
import { MoreVertical, Plus, Trash2 } from 'lucide-react'

interface BudgetCardProps {
  id: string
  title: string
  total: string
  spent: string
  remaining: string
  date: string
  spentPercentage: number
  variant?: 'income' | 'expense' | 'savings'
  onAddAmount?: (id: string) => void
  onDelete?: (id: string) => void
}

function BudgetCard({ id, title, total, spent, remaining, date, spentPercentage, variant = 'income', onAddAmount, onDelete }: BudgetCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  
  // Calculate the remaining percentage
  const remainingPercentage = 100 - spentPercentage
  
  // Color schemes based on variant
  const colorSchemes = {
    income: {
      border: 'hover:border-green-500/30',
      gradient: 'from-green-500/5',
      titleHover: 'group-hover:text-green-600',
      glow: 'bg-green-500/10',
      primaryStroke: 'stroke-green-500',
      secondaryStroke: 'stroke-green-300',
      primaryShadow: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))',
      secondaryShadow: 'drop-shadow(0 0 8px rgba(134, 239, 172, 0.4))',
      gradientBar: 'from-green-500 to-green-300',
      primaryDot: 'bg-green-500',
      secondaryDot: 'bg-green-300',
      primaryPing: 'bg-green-500',
      secondaryPing: 'bg-green-300',
      accentDot: 'bg-green-500',
      percentageText: 'text-green-600'
    },
    expense: {
      border: 'hover:border-red-500/30',
      gradient: 'from-red-500/5',
      titleHover: 'group-hover:text-red-600',
      glow: 'bg-red-500/10',
      primaryStroke: 'stroke-red-500',
      secondaryStroke: 'stroke-red-300',
      primaryShadow: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))',
      secondaryShadow: 'drop-shadow(0 0 8px rgba(252, 165, 165, 0.4))',
      gradientBar: 'from-red-500 to-red-300',
      primaryDot: 'bg-red-500',
      secondaryDot: 'bg-red-300',
      primaryPing: 'bg-red-500',
      secondaryPing: 'bg-red-300',
      accentDot: 'bg-red-500',
      percentageText: 'text-red-600'
    },
    savings: {
      border: 'hover:border-blue-500/30',
      gradient: 'from-blue-500/5',
      titleHover: 'group-hover:text-blue-600',
      glow: 'bg-blue-500/10',
      primaryStroke: 'stroke-blue-500',
      secondaryStroke: 'stroke-blue-300',
      primaryShadow: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))',
      secondaryShadow: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.4))',
      gradientBar: 'from-blue-500 to-blue-300',
      primaryDot: 'bg-blue-500',
      secondaryDot: 'bg-blue-300',
      primaryPing: 'bg-blue-500',
      secondaryPing: 'bg-blue-300',
      accentDot: 'bg-blue-500',
      percentageText: 'text-blue-600'
    }
  }
  
  const colors = colorSchemes[variant]
  
  // Calculate stroke dash array for the circles
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const spentOffset = circumference - (spentPercentage / 100) * circumference
  const remainingOffset = circumference - (remainingPercentage / 100) * circumference

  return (
    <div className={`group bg-card rounded-lg border ${colors.border} p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <h3 className={`text-base font-semibold text-foreground ${colors.titleHover} transition-colors`}>{title}</h3>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 hover:bg-accent rounded-md border border-transparent hover:border-border transition-colors" 
              aria-label="More options"
            >
              <MoreVertical size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden">
                  <button
                    onClick={() => {
                      onAddAmount?.(id)
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    <Plus size={16} className="text-chart-4" />
                    <span>Add Amount</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.(id)
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors border-t border-border"
                  >
                    <Trash2 size={16} />
                    <span>Delete Budget</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Progress Circle and Info */}
        <div className="flex items-center justify-between gap-6">
          {/* SVG Circle Progress */}
          <div className="relative flex-shrink-0">
            {/* Glow effect behind circle */}
            <div className={`absolute inset-0 ${colors.glow} blur-2xl rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90 relative">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-muted/30"
                strokeWidth="10"
                fill="none"
              />
              
              {/* Remaining amount circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className={`${colors.secondaryStroke} drop-shadow-lg`}
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={remainingOffset}
                strokeLinecap="round"
                style={{ 
                  transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              
              {/* Spent amount circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className={`${colors.primaryStroke} drop-shadow-lg`}
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={spentOffset}
                strokeLinecap="round"
                style={{ 
                  transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Total</span>
              <span className="text-xl font-bold text-foreground">{total}</span>
              <div className={`mt-1 w-6 h-0.5 bg-gradient-to-r ${colors.gradientBar} rounded-full`} />
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 flex-1">
            {/* Spent */}
            <div className="group/item flex flex-col gap-1.5 p-2.5 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className={`w-2 h-2 rounded-full ${colors.primaryDot} block`}></span>
                  <span className={`absolute inset-0 w-2 h-2 rounded-full ${colors.primaryPing} animate-ping opacity-75`}></span>
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Spent</span>
              </div>
              <span className="text-base font-bold text-foreground ml-0">{spent}</span>
            </div>

            {/* Remaining */}
            <div className="group/item flex flex-col gap-1.5 p-2.5 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className={`w-2 h-2 rounded-full ${colors.secondaryDot} block`}></span>
                  <span className={`absolute inset-0 w-2 h-2 rounded-full ${colors.secondaryPing} animate-ping opacity-75`}></span>
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Remaining</span>
              </div>
              <span className="text-base font-bold text-foreground ml-0">{remaining}</span>
            </div>
          </div>
        </div>

        {/* Footer with date and progress indicator */}
        <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${colors.accentDot} animate-pulse`} />
            <span className="text-xs font-medium text-muted-foreground">{date}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-accent border border-border rounded-md">
            <span className={`text-xs font-semibold ${colors.percentageText}`}>{spentPercentage}%</span>
            <span className="text-xs text-muted-foreground">used</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetCard