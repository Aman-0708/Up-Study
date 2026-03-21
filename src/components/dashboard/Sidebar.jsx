import { Link, useNavigate } from 'react-router-dom'
import Icon from '../Icon'

const navItems = [
  { icon: 'home', label: 'Dashboard', path: '/dashboard' },
  { icon: 'calendar', label: 'Schedule', path: '/schedule' },
  { icon: 'repeat', label: 'Routines', path: '/routines' },
  { icon: 'chart', label: 'Progress', path: '/progress' },
  { icon: 'flame', label: 'Streak', path: '/streak' },
  { icon: 'user', label: 'Profile', path: '/profile' },
]

export default function Sidebar({ activePath, isOpen, onClose }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = user.firstName && user.lastName
    ? user.firstName[0] + user.lastName[0]
    : 'SF'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-56 bg-[#16161d] border-r border-white/5 flex flex-col z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-base">
              <Icon name="book" size={16} />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              StudyFlow
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          <div className="text-[10px] font-medium text-white/20 uppercase tracking-widest px-3 mb-2">
            Main
          </div>
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors
                ${activePath === item.path
                  ? 'bg-violet-600/15 text-violet-400'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </Link>
          ))}

          <div className="text-[10px] font-medium text-white/20 uppercase tracking-widest px-3 mb-2 mt-4">
            Insights
          </div>
          {navItems.slice(3, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors
                ${activePath === item.path
                  ? 'bg-violet-600/15 text-violet-400'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </Link>
          ))}

          <div className="text-[10px] font-medium text-white/20 uppercase tracking-widest px-3 mb-2 mt-4">
            Account
          </div>
          {navItems.slice(5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors
                ${activePath === item.path
                  ? 'bg-violet-600/15 text-violet-400'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-teal-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm text-white font-medium truncate">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-white/30 truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <Icon name="logout" size={16} />
            Sign out
          </button>
        </div>

      </aside>
    </>
  )
}