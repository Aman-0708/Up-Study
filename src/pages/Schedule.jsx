import { useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { api } from '../utils/api'
import Icon from '../components/Icon'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']


const colorMap = {
  violet: 'bg-violet-600/20 border-l-2 border-violet-500 text-violet-300',
  teal: 'bg-teal-500/20 border-l-2 border-teal-500 text-teal-300',
  amber: 'bg-amber-500/20 border-l-2 border-amber-500 text-amber-300',
  green: 'bg-green-500/20 border-l-2 border-green-500 text-green-300',
  pink: 'bg-pink-500/20 border-l-2 border-pink-500 text-pink-300',
}

const emptyForm = {
  subject: '',
  day: 'Mon',
  hour: '8 AM',
  duration: 60,
  color: 'violet',
}

export default function Schedule() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [selectedSession, setSelectedSession] = useState(null)
  const [view, setView] = useState(window.innerWidth < 768 ? 'day' : 'week')
  const token = localStorage.getItem('token')


  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await api('/sessions', 'GET', null, token)
        setSessions(data)
      } catch (error) {
        console.error('Failed to fetch sessions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSessions()
  }, [])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
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
      console.log('Submitting form:', form) // add this
      const created = await api('/sessions', 'POST', form, token)
      setSessions([...sessions, created])
      setShowModal(false)
      setForm(emptyForm)
    } catch (error) {
      console.error('Failed to create session:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api(`/sessions/${id}`, 'DELETE', null, token)
      setSessions(sessions.filter((s) => s._id !== id))
      setSelectedSession(null)
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  }
  const markComplete = async (id) => {
    try {
      const updated = await api(`/sessions/${id}`, 'PUT', { completed: true }, token)
      setSessions(sessions.map((s) => s._id === id ? updated : s))
      setSelectedSession(updated)
    } catch (error) {
      console.error('Failed to mark session as complete:', error)
    }
  }

  const getSessionsForCell = (day, hour) => {
    return sessions.filter((s) => s.day === day && s.hour === hour)
  }

  const getTodaySessions = () => {
    return sessions
      .filter((s) => s.day === today)
      .sort((a, b) => HOURS.indexOf(a.hour) - HOURS.indexOf(b.hour))
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Schedule</h1>
          <p className="text-sm text-white/40 mt-1">March 17 – 23, 2026</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setView('week')}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                ${view === 'week' ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white'}`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                ${view === 'day' ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white'}`}
            >
              Day
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <span>+</span> Add session
          </button>
        </div>
      </div>


      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <div className="text-sm text-white/30">Loading sessions...</div>
        </div>
      )}

      {/* WEEK VIEW */}
      {view === 'week' && (
        <div>

          {/* Mobile notice */}
          <div className="md:hidden bg-violet-600/10 border border-violet-500/20 rounded-2xl p-4 mb-4 flex items-start gap-3">
            <span className="text-lg flex-shrink-0">📱</span>
            <div>
              <p className="text-sm font-medium text-violet-400 mb-1">
                Week view works best on desktop
              </p>
              <p className="text-xs text-white/40 mb-3">
                On mobile, the day view gives you a cleaner experience.
              </p>
              <button
                onClick={() => setView('day')}
                className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Switch to day view
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">

            {/* Day headers */}
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">

                <div className="grid grid-cols-8 border-b border-white/5">
                  <div className="p-3 border-r border-white/5" />
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className={`p-3 text-center text-xs font-medium border-r border-white/5 last:border-r-0
                        ${day === today ? 'text-violet-400' : 'text-white/40'}`}
                    >
                      {day}
                      {day === today && (
                        <div className="w-1 h-1 bg-violet-400 rounded-full mx-auto mt-1" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Time rows */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="grid grid-cols-8 border-b border-white/5 last:border-b-0"
                  >
                    <div className="p-2 border-r border-white/5 text-xs text-white/20 text-right pr-3 pt-3">
                      {hour}
                    </div>
                    {DAYS.map((day) => {
                      const cellSessions = getSessionsForCell(day, hour)
                      return (
                        <div
                          key={day}
                          className={`min-h-[52px] p-1 border-r border-white/5 last:border-r-0
                            ${day === today ? 'bg-violet-600/[0.03]' : ''}`}
                        >
                          {cellSessions.map((session) => (
                            <div
                              key={session._id}
                              onClick={() => setSelectedSession(session)}
                              className={`rounded-md px-1.5 py-1 text-[10px] font-medium cursor-pointer mb-1 truncate
    ${session.completed ? 'bg-green-500/20 border-l-2 border-green-500 text-green-300' : colorMap[session.color] || colorMap.violet}`}
                            >
                              {session.subject}
                              <div className="text-[9px] opacity-70">{session.completed ? 'Done' : `${session.duration}m`}</div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      )}


      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <div className="text-sm text-white/30">Loading sessions...</div>
        </div>
      )}

      {/* DAY VIEW */}
      {view === 'day' && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-sm font-medium text-white">
              Today —{' '}
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <span className="text-xs bg-violet-600/15 text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full">
              {getTodaySessions().length} sessions
            </span>
          </div>

          {getTodaySessions().length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">📅</div>
              <h2 className="text-base font-semibold text-white mb-2">No sessions today</h2>
              <p className="text-sm text-white/40 mb-6">Add a session to get started.</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Add session
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {getTodaySessions().map((session) => (
                <div
                  key={session._id}
                  onClick={() => setSelectedSession(session)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-all
    ${session.completed
                      ? 'bg-green-500/10 border-green-500/20'
                      : `${colorMap[session.color] || colorMap.violet} border-white/5 hover:border-white/10`
                    }`}
                >
                  <div className="text-sm font-medium min-w-[56px]">{session.hour}</div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${session.completed ? 'text-green-400 line-through opacity-60' : 'text-white'}`}>
                      {session.subject}
                    </div>
                    <div className="text-xs opacity-60 mt-0.5">
                      {session.completed ? 'Completed' : `${session.duration} minutes`}
                    </div>
                  </div>
                  {session.completed && (
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                      <Icon name="check" size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Session detail modal */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Session details</h2>
              <button
                onClick={() => setSelectedSession(null)}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Status badge */}
            <div className="mb-5">
              {selectedSession.completed ? (
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-full font-medium">
                  <Icon name="check" size={12} />
                  Completed
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs px-3 py-1.5 rounded-full font-medium">
                  <Icon name="clock" size={12} />
                  Upcoming
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Subject</span>
                <span className="text-white font-medium">{selectedSession.subject}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Day</span>
                <span className="text-white">{selectedSession.day}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Time</span>
                <span className="text-white">{selectedSession.hour}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Duration</span>
                <span className="text-white">{selectedSession.duration} minutes</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {!selectedSession.completed && (
                <button
                  onClick={() => markComplete(selectedSession._id)}
                  className="w-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="check" size={15} />
                  Mark as complete
                </button>
              )}
              <button
                onClick={() => handleDelete(selectedSession._id)}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium py-3 rounded-lg transition-colors"
              >
                Delete session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add session modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5">
          <div className="bg-[#16161d] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">Add study session</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Physics"
                  className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                />
                {errors.subject && (
                  <span className="text-xs text-red-400">{errors.subject}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-white/60">Day</label>
                  <select
                    name="day"
                    value={form.day}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d} className="bg-[#16161d]">{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-white/60">Time</label>
                  <select
                    name="hour"
                    value={form.hour}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h} className="bg-[#16161d]">{h}</option>
                    ))}
                  </select>
                </div>
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

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Color</label>
                <div className="flex gap-2">
                  {['violet', 'teal', 'amber', 'green', 'pink'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-8 h-8 rounded-full transition-all
                        ${color === 'violet' ? 'bg-violet-600' : ''}
                        ${color === 'teal' ? 'bg-teal-500' : ''}
                        ${color === 'amber' ? 'bg-amber-500' : ''}
                        ${color === 'green' ? 'bg-green-500' : ''}
                        ${color === 'pink' ? 'bg-pink-500' : ''}
                        ${form.color === color ? 'ring-2 ring-white/40 scale-110' : 'opacity-50'}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-3 rounded-lg transition-colors mt-1"
              >
                Add session
              </button>

            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  )
}