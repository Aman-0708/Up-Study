import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setServerError('')

      const data = await api('/auth/login', 'POST', {
        email: formData.email,
        password: formData.password,
      })

      // Save token and user to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      }))

      // Redirect to dashboard
      navigate('/dashboard')

    } catch (error) {
      setServerError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f13] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-base">
            📚
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            StudyFlow
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-white/40 text-sm">
              Sign in to continue your study journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white/60">
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
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
            </div>

            {/* Server error */}
            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-3 rounded-lg transition-colors mt-1"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </form>

        </div>

        {/* Switch to register */}
        <p className="text-center text-sm text-white/30 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
            Create one
          </Link>
        </p>

      </div>
    </main>
  )
}