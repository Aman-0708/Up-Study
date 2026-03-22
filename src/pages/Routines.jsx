import { useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { api } from '../utils/api'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const emptyForm = {
  name: '',
  subject: '',
  topic: '',
  time: '08:00',
  duration: 60,
  days: [],
  color: 'violet',
}

const colorMap = {
  violet: {
    bg: 'bg-violet-600/15',
    border: 'border-violet-500/20',
    text: 'text-violet-400',
    tag: 'bg-violet-600/10 text-violet-400',
    toggle: 'bg-violet-600',
  },
  teal: {
    bg: 'bg-teal-500/15',
    border: 'border-teal-500/20',
    text: 'text-teal-400',
    tag: 'bg-teal-500/10 text-teal-400',
    toggle: 'bg-teal-500',
  },
  amber: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    tag: 'bg-amber-500/10 text-amber-400',
    toggle: 'bg-amber-500',
  },
  green: {
    bg: 'bg-green-500/15',
    border: 'border-green-500/20',
    text: 'text-green-400',
    tag: 'bg-green-500/10 text-green-400',
    toggle: 'bg-green-500',
  },
  pink: {
    bg: 'bg-pink-500/15',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
    tag: 'bg-pink-500/10 text-pink-400',
    toggle: 'bg-pink-500',
  },
}

const colorIcons = {
  violet: '📐',
  teal: '💻',
  amber: '⚛️',
  green: '📖',
  pink: '🎨',
}



export default function Routines() {
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editRoutine, setEditRoutine] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [showDeleteId, setShowDeleteId] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const data = await api('/routines', 'GET', null, token)
        setRoutines(data)
      } catch (error) {
        console.error('Failed to fetch routines:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRoutines()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const toggleDay = (day) => {
    const updated = form.days.includes(day)
      ? form.days.filter((d) => d !== day)
      : [...form.days, day]
    setForm({ ...form, days: updated })
    setErrors({ ...errors, days: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Routine name is required'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (form.days.length === 0) newErrors.days = 'Select at least one day'
    return newErrors
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditRoutine(null)
    setErrors({})
    setShowModal(true)
  }

  const openEdit = (routine) => {
    setForm({
      name: routine.name,
      subject: routine.subject,
      topic: routine.topic,
      time: routine.time,
      duration: routine.duration,
      days: routine.days,
      color: routine.color,
    })
    setEditRoutine(routine._id)
    setErrors({})
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      if (editRoutine) {
        const updated = await api(`/routines/${editRoutine}`, 'PUT', form, token)
        setRoutines(routines.map((r) => r._id === editRoutine ? updated : r))
      } else {
        const created = await api('/routines', 'POST', form, token)
        setRoutines([created, ...routines])
      }
      setShowModal(false)
    } catch (error) {
      console.error('Failed to save routine:', error)
    }
  }

  const toggleActive = async (id) => {
    try {
      const routine = routines.find((r) => r._id === id)
      const updated = await api(`/routines/${id}`, 'PUT', { active: !routine.active }, token)
      setRoutines(routines.map((r) => r._id === id ? updated : r))
    } catch (error) {
      console.error('Failed to toggle routine:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api(`/routines/${id}`, 'DELETE', null, token)
      setRoutines(routines.filter((r) => r._id !== id))
      setShowDeleteId(null)
    } catch (error) {
      console.error('Failed to delete routine:', error)
    }
  }

  const formatTime = (time) => {
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const suffix = hour >= 12 ? 'PM' : 'AM'
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${display}:${m} ${suffix}`
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">My Routines</h1>
          <p className="text-sm text-white/40 mt-1">
            Manage your study habits and routines
          </p>
        </div>
        <button
          onClick={openCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <span>+</span> New routine
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-20">
          <div className="text-sm text-white/30">Loading routines...</div>
        </div>
      )}

      {/* Empty state */}
      {!loading && routines.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-base font-semibold text-white mb-2">No routines yet</h2>
          <p className="text-sm text-white/40 mb-6">
            Create your first study routine to get started.
          </p>
          <button
            onClick={openCreate}
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Create routine
          </button>
        </div>
      )}

      {/* Routines grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {routines.map((routine) => {
          const c = colorMap[routine.color] || colorMap.violet
          return (
            <div
              key={routine._id}
              className="bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center text-lg`}>
                  {colorIcons[routine.color] || '📚'}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(routine)}
                    className="text-white/20 hover:text-white/60 transition-colors text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setShowDeleteId(routine._id)}
                    className="text-white/20 hover:text-red-400 transition-colors text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-1">
                  {routine.name}
                </h3>
                <p className="text-xs text-white/30 mb-3">
                  {formatTime(routine.time)} · {routine.duration} min
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${c.tag}`}>
                    {routine.subject}
                  </span>
                  {routine.topic && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/30">
                      {routine.topic}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-1">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-medium
                        ${routine.days.includes(day)
                          ? `${c.bg} ${c.text}`
                          : 'bg-white/5 text-white/20'
                        }`}
                    >
                      {day[0]}
                    </div>
                  ))}
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggleActive(routine._id)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${routine.active ? c.toggle : 'bg-white/10'}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${routine.active ? 'left-5' : 'left-0.5'}`}
                  />
                </button>
              </div>

            </div>
          )
        })}

        {/* Add new card */}
        <div
          onClick={openCreate}
          className="border border-dashed border-white/10 hover:border-violet-500/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors min-h-[200px]"
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 text-xl">
            +
          </div>
          <p className="text-sm text-white/20">Create new routine</p>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5">
          <div className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">
                {editRoutine ? 'Edit routine' : 'New routine'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Routine name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Morning Math"
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
              </div>

              {/* Subject + Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-white/60">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                    className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                  />
                  {errors.subject && <span className="text-xs text-red-400">{errors.subject}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-white/60">Topic (optional)</label>
                  <input
                    type="text"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    placeholder="e.g. Calculus"
                    className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Time + Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-white/60">Start time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-white/60">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    min="15"
                    max="240"
                    className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Color */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Color</label>
                <div className="flex gap-2">
                  {Object.keys(colorMap).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-8 h-8 rounded-full transition-all ${colorMap[color].toggle}
                        ${form.color === color ? 'ring-2 ring-white/40 scale-110' : 'opacity-50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Days */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Repeat days</label>
                <div className="flex gap-2 flex-wrap">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors
                        ${form.days.includes(day)
                          ? 'bg-violet-600 text-white'
                          : 'bg-white/5 text-white/40 hover:bg-white/10'
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {errors.days && <span className="text-xs text-red-400">{errors.days}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-3 rounded-lg transition-colors mt-1"
              >
                {editRoutine ? 'Save changes' : 'Create routine'}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5">
          <div className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <div className="text-2xl mb-3">🗑️</div>
            <h3 className="text-base font-semibold text-white mb-2">
              Delete this routine?
            </h3>
            <p className="text-sm text-white/40 mb-6">
              This will permanently delete this routine. This cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteId(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteId)}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-400 text-sm font-medium py-3 rounded-lg transition-colors"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  )
}