import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <footer className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* CTA Card */}
        <div className="relative overflow-hidden bg-violet-600/10 border border-violet-500/20 rounded-3xl px-8 py-16 text-center mb-16">

          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Ready to build better
              <br />
              study habits?
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto mb-8">
              Join thousands of students already using StudyFlow to stay
              consistent and reach their academic goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors">
                Get started for free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors">
                Sign in
              </Link>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-sm">
              📚
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              StudyFlow
            </span>
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-white/40 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-white/40 hover:text-white transition-colors">
              How it works
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Terms
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/20">
            © 2026 StudyFlow. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}