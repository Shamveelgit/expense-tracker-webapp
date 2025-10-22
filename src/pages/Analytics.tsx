import { TrendingUp, PieChart, BarChart3, Activity } from 'lucide-react'

function Analytics() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-chart-1 rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Analytics</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Insights and trends for your financial data</p>
        </div>

        {/* Coming Soon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Spending Trends</h3>
            </div>
            <p className="text-muted-foreground">Track your spending patterns over time with detailed trend analysis and forecasting.</p>
          </div>

          <div className="group bg-card border-2 border-border rounded-2xl p-8 hover:border-chart-2/30 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-chart-2/10 rounded-xl group-hover:scale-110 transition-transform">
                <PieChart className="w-8 h-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Category Breakdown</h3>
            </div>
            <p className="text-muted-foreground">Visual representation of expenses by category with interactive pie charts.</p>
          </div>

          <div className="group bg-card border-2 border-border rounded-2xl p-8 hover:border-chart-3/30 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-chart-3/10 rounded-xl group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Monthly Comparison</h3>
            </div>
            <p className="text-muted-foreground">Compare your monthly expenses and identify opportunities to save money.</p>
          </div>

          <div className="group bg-card border-2 border-border rounded-2xl p-8 hover:border-chart-4/30 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-chart-4/10 rounded-xl group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-chart-4" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Budget Performance</h3>
            </div>
            <p className="text-muted-foreground">Analyze how well you're sticking to your budgets with performance metrics.</p>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border-2 border-primary/20 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary">Advanced analytics coming soon</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
