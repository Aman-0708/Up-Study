import { Link } from 'react-router-dom'
import FadeIn from '../FadeIn'
import Icon from '../Icon'

export default function CallToAction() {
  return (
    <footer className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* CTA card */}
        <FadeIn direction="up">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/20 via-violet-600/5 to-transparent border border-violet-500/20 rounded-3xl px-8 py-16 text-center mb-16">

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs px-4 py-1.5 rounded-full mb-6 font-medium">
                <Icon name="star" size={12} />
                Free to get started
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Ready to build better
                <br />study habits?
              </h2>
              <p className="text-white/40 text-lg max-w-md mx-auto mb-8">
                Join thousands of students already using StudyFlow to stay
                consistent and reach their academic goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-all"
                >
                  Get started for free
                  <Icon name="arrow" size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors text-center"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Footer bottom */}
        <FadeIn direction="up" delay={100}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white">
                <Icon name="book" size={14} />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                StudyFlow
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-sm text-white/30 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-white/30 hover:text-white transition-colors">How it works</a>
              <a href="#" className="text-sm text-white/30 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-white/30 hover:text-white transition-colors">Terms</a>
            </div>
            <div className="text-sm text-white/20">
              © 2026 StudyFlow. All rights reserved.
            </div>
          </div>
        </FadeIn>

      </div>
    </footer>
  )
}