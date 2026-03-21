import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    return newErrors
  }

  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      setServerError('')

      const data = await api('/auth/register', 'POST', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
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
    <main className="min-h-screen bg-[#0f0f13] flex items-center justify-center px-6 py-12">
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
              Create your account
            </h1>
            <p className="text-white/40 text-sm">
              Start building better study habits today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Amara"
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {errors.firstName && (
                  <span className="text-xs text-red-400">{errors.firstName}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Okafor"
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {errors.lastName && (
                  <span className="text-xs text-red-400">{errors.lastName}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {errors.email && (
                <span className="text-xs text-red-400">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {errors.phone && (
                <span className="text-xs text-red-400">{errors.phone}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {errors.password && (
                <span className="text-xs text-red-400">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-400">{errors.confirmPassword}</span>
              )}
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
              {loading ? 'Creating account...' : 'Create account'}
            </button>

          </form>
        </div>

        {/* Switch to login */}
        <p className="text-center text-sm text-white/30 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </main>
  )
}