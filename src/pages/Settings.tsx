import { Bell, Lock, Globe, Palette, Database, Shield } from 'lucide-react'

function Settings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-chart-1 rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Customize your experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="space-y-3 ml-11">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Email notifications</span>
                <input type="checkbox" className="w-5 h-5 rounded accent-primary" defaultChecked />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Budget alerts</span>
                <input type="checkbox" className="w-5 h-5 rounded accent-primary" defaultChecked />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Weekly reports</span>
                <input type="checkbox" className="w-5 h-5 rounded accent-primary" />
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-chart-1/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-chart-1/10 rounded-lg">
                <Lock className="w-5 h-5 text-chart-1" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Security</h3>
            </div>
            <div className="space-y-3 ml-11">
              <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Change password
              </button>
              <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Two-factor authentication
              </button>
              <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Active sessions
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-chart-2/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Palette className="w-5 h-5 text-chart-2" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
            </div>
            <div className="space-y-3 ml-11">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Theme</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                    Light
                  </button>
                  <button className="px-4 py-2 bg-accent text-foreground rounded-lg text-sm font-medium hover:bg-accent/80">
                    Dark
                  </button>
                  <button className="px-4 py-2 bg-accent text-foreground rounded-lg text-sm font-medium hover:bg-accent/80">
                    Auto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-chart-3/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Globe className="w-5 h-5 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Language & Region</h3>
            </div>
            <div className="space-y-3 ml-11">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Language</p>
                <select className="w-full px-3 py-2 bg-accent border border-border rounded-lg text-sm text-foreground">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Currency</p>
                <select className="w-full px-3 py-2 bg-accent border border-border rounded-lg text-sm text-foreground">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 hover:border-chart-4/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-chart-4/10 rounded-lg">
                <Shield className="w-5 h-5 text-chart-4" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Privacy</h3>
            </div>
            <div className="space-y-3 ml-11">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Profile visibility</span>
                <input type="checkbox" className="w-5 h-5 rounded accent-primary" defaultChecked />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Activity tracking</span>
                <input type="checkbox" className="w-5 h-5 rounded accent-primary" />
              </label>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-card border-2 border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Database className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            </div>
            <div className="space-y-3 ml-11">
              <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Export data
              </button>
              <button className="w-full text-left text-sm text-red-500 hover:text-red-600 transition-colors py-2">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
