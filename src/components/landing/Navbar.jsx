import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0f0f13]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-base">
                        📚
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">
                        StudyFlow
                    </span>
                </div>

                {/* Nav Links — desktop only */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">
                        How it works
                    </a>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">

                    {/* CTA buttons — desktop only */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors">
                            Sign in
                        </Link>
                        <Link to="/register" className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors">
                            Get started
                        </Link>
                    </div>
                    {/* Hamburger button — mobile only */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu — drops down when open */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64 border-t border-white/5' : 'max-h-0'}`}>
                <div className="px-6 py-4 flex flex-col gap-4">

                    <a href="#features"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                        Features
                    </a>

                    <a href="#how-it-works"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                        How it works
                    </a>
                    <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-white/60 hover:text-white transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-lg transition-colors block"
                        >
                            Get started
                        </Link>
                    </div><div className="flex flex-col gap-3 pt-2 border-t border-white/5">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-white/60 hover:text-white transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-lg transition-colors block"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </div>

        </nav>
    )
}