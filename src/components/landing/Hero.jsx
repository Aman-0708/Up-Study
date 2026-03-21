import { Link } from 'react-router-dom'
import FadeIn from '../FadeIn'
import Icon from '../Icon'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Badge */}
        <FadeIn direction="down" delay={0}>
          <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs px-4 py-1.5 rounded-full mb-8 font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Built for university students
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn direction="up" delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Build habits that{' '}
            <span className="relative inline-block">
              <span className="text-violet-400">actually stick</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 9C50 4 100 2 150 5C200 8 250 10 298 6" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
          </h1>
        </FadeIn>

        {/* Subheading */}
        <FadeIn direction="up" delay={200}>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-10">
            StudyFlow helps you create study routines, track your progress,
            and stay consistent — one session at a time.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn direction="up" delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
              Sign in to your account
            </Link>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn direction="up" delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center pt-8 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold text-white">2,400+</div>
              <div className="text-sm text-white/30 mt-1">Active students</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-white/30 mt-1">Consistency rate</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div>
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-sm text-white/30 mt-1">Sessions completed</div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}