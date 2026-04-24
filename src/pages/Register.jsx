import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import Icon from '../components/Icon'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setServerError('')
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
        role: formData.role,
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

        {/* Background grid */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

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
            Start your journey
            <br />
            <span className="text-violet-400">today.</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed mb-10">
            Join thousands of students building better study habits with StudyFlow.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '2,400+', label: 'Students' },
              { value: '50k+', label: 'Sessions' },
              { value: '98%', label: 'Consistency' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-violet-400">{stat.value}</div>
                <div className="text-xs text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <div className="border-l-2 border-violet-500/30 pl-4">
            <p className="text-sm text-white/30 italic leading-relaxed">
              "The secret of getting ahead is getting started."
            </p>
            <p className="text-xs text-white/20 mt-2">— Mark Twain</p>
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
              Create your account
            </h2>
            <p className="text-white/40 text-sm">
              Start building better study habits today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Amara"
                  className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
                />
                {errors.firstName && <span className="text-xs text-red-400">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Okafor"
                  className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
                />
                {errors.lastName && <span className="text-xs text-red-400">{errors.lastName}</span>}
              </div>
            </div>

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
                className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
              />
              {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
              />
              {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all
        ${formData.role === 'student'
                      ? 'bg-accent-600/20 border-accent-500/40 text-accent-400'
                      : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                    }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'lecturer' })}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all
        ${formData.role === 'lecturer'
                      ? 'bg-accent-600/20 border-accent-500/40 text-accent-400'
                      : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                    }`}
                >
                  Lecturer
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
              />
              {errors.password && <span className="text-xs text-red-400">{errors.password}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all"
              />
              {errors.confirmPassword && <span className="text-xs text-red-400">{errors.confirmPassword}</span>}
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
              {loading ? 'Creating account...' : (
                <>
                  Create account
                  <Icon name="arrow" size={15} />
                </>
              )}
            </button>

          </form>

          {/* Switch */}
          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}