import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import Icon from '../components/Icon'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setServerError('')
      const data = await api('/auth/login', 'POST', {
        email: formData.email,
        password: formData.password,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role,
      }))
      navigate('/dashboard')
    } catch (error) {
      setServerError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f13] flex">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0c0c10] border-r border-white/5 p-12 relative overflow-hidden">

        {/* Background effects */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white">
            <Icon name="book" size={18} />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">StudyFlow</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight mb-4">
            Your study habits,
            <br />
            <span className="text-violet-400">elevated.</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed mb-10">
            Track your routines, build streaks, and reach your academic goals — all in one place.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-4">
            {[
              { icon: 'repeat', text: 'Build personalized study routines' },
              { icon: 'flame', text: 'Stay consistent with streak tracking' },
              { icon: 'chart', text: 'Monitor your progress over time' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-600/15 border border-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={15} />
                </div>
                <span className="text-sm text-white/50">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <div className="border-l-2 border-violet-500/30 pl-4">
            <p className="text-sm text-white/30 italic leading-relaxed">
              "Success is the sum of small efforts, repeated day in and day out."
            </p>
            <p className="text-xs text-white/20 mt-2">— Robert Collier</p>
          </div>
        </div>

      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
              <Icon name="book" size={16} />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">StudyFlow</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-white/40 text-sm">
              Sign in to continue your study journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
              />
            </div>

            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-colors mt-1 flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign in
                  <Icon name="arrow" size={15} />
                </>
              )}
            </button>

          </form>

          {/* Switch */}
          <p className="text-center text-sm text-white/30 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}