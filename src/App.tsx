import './App.css'
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/sidebar'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { 
  IconHome, 
  IconReceipt, 
  IconWallet, 
  IconChartBar, 
  IconSettings,
  IconUser
} from '@tabler/icons-react'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budgets from './pages/Budgets'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  const [open, setOpen] = useState(false)
  
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <IconHome className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Expenses",
      href: "/expenses",
      icon: <IconReceipt className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Budgets",
      href: "/budgets",
      icon: <IconWallet className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <IconChartBar className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUser className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />,
    },
  ]

  return (
    <Router>
      <div className="flex flex-col md:flex-row bg-background w-full overflow-hidden h-screen">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Shamveel",
                  href: "/profile",
                  icon: (
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shamveel"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="bg-background min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <span className="font-bold text-xl text-foreground whitespace-pre">
        Expense Manager
      </span>
    </a>
  )
}

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  )
}

export default App
