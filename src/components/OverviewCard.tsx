import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

interface OverviewCardProps {
  title: string
  amount: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  variant: 'income' | 'expense' | 'savings'
  icon?: React.ReactNode
}

function OverviewCard({ title, amount, change, changeType, variant }: OverviewCardProps) {
  // Color schemes based on variant
  const colorSchemes = {
    income: {
      border: 'border-green-500/20 hover:border-green-500/40',
      gradient: 'from-green-500/10 via-green-400/5 to-transparent',
      bgGradient: 'from-green-500/5 to-green-400/10',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
      accentDot: 'bg-green-500',
      shadow: 'hover:shadow-lg',
    },
    expense: {
      border: 'border-red-500/20 hover:border-red-500/40',
      gradient: 'from-red-500/10 via-red-400/5 to-transparent',
      bgGradient: 'from-red-500/5 to-red-400/10',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-600',
      textColor: 'text-red-600',
      accentDot: 'bg-red-500',
      shadow: 'hover:shadow-lg',
    },
    savings: {
      border: 'border-blue-500/20 hover:border-blue-500/40',
      gradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
      bgGradient: 'from-blue-500/5 to-blue-400/10',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      accentDot: 'bg-blue-500',
      shadow: 'hover:shadow-lg',
    },
  }

  const colors = colorSchemes[variant]

  // Icon selection based on variant
  const getIcon = () => {
    switch (variant) {
      case 'income':
        return <TrendingUp className="w-5 h-5" />
      case 'expense':
        return <TrendingDown className="w-5 h-5" />
      case 'savings':
        return <Wallet className="w-5 h-5" />
    }
  }

  return (
    <div
      className={`group relative bg-card rounded-lg border ${colors.border} p-4 sm:p-5 ${colors.shadow} transition-all duration-300 overflow-hidden`}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Decorative circle */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${colors.bgGradient} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider truncate">
              {title}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-1 h-1 rounded-full ${colors.accentDot} animate-pulse flex-shrink-0`} />
              <span className="text-xs text-muted-foreground truncate">October 2025</span>
            </div>
          </div>
          <div
            className={`${colors.iconBg} ${colors.iconColor} p-2 sm:p-2.5 rounded-lg border border-border group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2`}
          >
            {getIcon()}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-2.5 sm:mb-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 tracking-tight break-all">
            {amount}
          </h3>
          <div className={`h-0.5 w-10 sm:w-12 bg-gradient-to-r ${colors.bgGradient} rounded-full`} />
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <div
            className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md border text-xs font-semibold flex-shrink-0 ${
              changeType === 'increase'
                ? 'bg-green-500/10 text-green-600 border-green-500/20'
                : changeType === 'decrease'
                ? 'bg-red-500/10 text-red-600 border-red-500/20'
                : 'bg-muted/50 text-muted-foreground border-border'
            }`}
          >
            {changeType === 'increase' && <TrendingUp className="w-3 h-3 flex-shrink-0" />}
            {changeType === 'decrease' && <TrendingDown className="w-3 h-3 flex-shrink-0" />}
            <span>{change}</span>
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  )
}

export default OverviewCard
