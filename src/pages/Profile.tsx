import { Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react'

function Profile() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-chart-1 rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Profile</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
          {/* Header Section with Avatar */}
          <div className="relative h-32 bg-gradient-to-r from-primary via-chart-1 to-chart-2">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shamveel"
                  className="w-32 h-32 rounded-2xl border-4 border-card shadow-xl"
                  alt="Profile"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Shamveel</h2>
                <p className="text-muted-foreground">Premium Member</p>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium">
                Edit Profile
              </button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">shamveel@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <Phone className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-medium text-foreground">India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
                <div className="p-2 bg-chart-4/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                  <p className="font-medium text-foreground">January 2024</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Activity Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/30 rounded-xl">
                  <p className="text-2xl font-bold text-foreground mb-1">127</p>
                  <p className="text-xs text-muted-foreground">Total Expenses</p>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-xl">
                  <p className="text-2xl font-bold text-foreground mb-1">6</p>
                  <p className="text-xs text-muted-foreground">Active Budgets</p>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-xl">
                  <p className="text-2xl font-bold text-foreground mb-1">89%</p>
                  <p className="text-xs text-muted-foreground">Savings Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
