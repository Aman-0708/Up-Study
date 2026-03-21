import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f0f13]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
            <Icon name="book" size={16} />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            StudyFlow
          </span>
        </Link>

        {/* Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-white/50 hover:text-white transition-colors">
            How it works
          </a>
        </div>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-white/50 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64 border-t border-white/5' : 'max-h-0'}`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          <a href="#features" onClick={() => setIsOpen(false)} className="text-sm text-white/50 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-sm text-white/50 hover:text-white transition-colors">
            How it works
          </a>
          <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm text-white/50 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-lg transition-colors block text-center"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}