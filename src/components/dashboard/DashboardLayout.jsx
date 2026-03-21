import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Icon from '../Icon'


export default function DashboardLayout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f0f13] flex">

      <Sidebar
        activePath={location.pathname}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">

        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0f0f13] sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-sm">
              📚
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              StudyFlow
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span className="block w-6 h-0.5 bg-white rounded-full" />
            <span className="block w-6 h-0.5 bg-white rounded-full" />
            <span className="block w-6 h-0.5 bg-white rounded-full" />
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 p-5 lg:p-8">
          {children}
        </div>

      </div>
    </div>
  )
}