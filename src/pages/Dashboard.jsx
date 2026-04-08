import { useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import StudyTips from '../components/dashboard/StudyTips'
import Icon from '../components/Icon'
import { api } from '../utils/api'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  const [stats, setStats] = useState(null)
  const [sessions, setSessions] = useState([])
  const [streak, setStreak] = useState({ currentStreak: 0 })
  const [loading, setLoading] = useState(true)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, sessionsRes, streakRes] = await Promise.all([
          api('/progress', 'GET', null, token),
          api('/sessions', 'GET', null, token),
          api('/progress/streak', 'GET', null, token),
        ])
        setStats(progressRes.stats)
        setSessions(sessionsRes)
        setStreak(streakRes)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const todaySessions = sessions
    .filter((s) => s.day === today)
    .sort((a, b) => {
      const hours = ['8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM']
      return hours.indexOf(a.hour) - hours.indexOf(b.hour)
    })

  const completedToday = todaySessions.filter((s) => s.completed).length
  const totalToday = todaySessions.length

  const subjectHours = {}
  sessions.forEach((s) => {
    if (!subjectHours[s.subject]) subjectHours[s.subject] = 0
    subjectHours[s.subject] += s.duration / 60
  })
  const topSubjects = Object.entries(subjectHours)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
  const maxSubjectHours = topSubjects.length > 0 ? topSubjects[0][1] : 1

  const subjectColors = [
    { bar: 'bg-violet-500', text: 'text-violet-400' },
    { bar: 'bg-teal-500', text: 'text-teal-400' },
    { bar: 'bg-amber-500', text: 'text-amber-400' },
    { bar: 'bg-green-500', text: 'text-green-400' },
  ]

  const statusStyles = {
    true: 'bg-green-500/10 text-green-400',
    false: 'bg-white/5 text-white/30',
  }

  const statusLabels = {
    true: 'Done',
    false: 'Upcoming',
  }

  return (
    <DashboardLayout>

      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1540] to-[#1a1e40] border border-white/5 rounded-2xl px-6 sm:px-8 py-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {getGreeting()}, {user.firstName}
            </h1>
            <div className="w-7 h-7 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center">
              <Icon name="star" size={14} />
            </div>
          </div>
          <p className="text-white/40 text-sm">
            {totalToday === 0
              ? "No sessions scheduled for today. Add one to get started!"
              : `${completedToday} of ${totalToday} sessions completed today. Keep it up!`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Icon name="clock" size={15} />
              Start session
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Icon name="calendar" size={15} />
              View schedule
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mb-4">
            <Icon name="book" size={18} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {loading ? '...' : `${stats?.totalHours || 0}h`}
          </div>
          <div className="text-xs text-white/40">Total hours studied</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
            <Icon name="check" size={18} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {loading ? '...' : stats?.completedSessions || 0}
          </div>
          <div className="text-xs text-white/40">Sessions completed</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <Icon name="flame" size={18} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {loading ? '...' : streak.currentStreak}
          </div>
          <div className="text-xs text-white/40">Day streak</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
            <Icon name="target" size={18} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {loading ? '...' : `${stats?.totalSessions > 0
              ? Math.round((stats?.completedSessions / stats?.totalSessions) * 100)
              : 0}%`}
          </div>
          <div className="text-xs text-white/40">Completion rate</div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Today's schedule */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Today's schedule</h2>
              <a href="/schedule" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                View all →
              </a>
            </div>
            {loading ? (
              <div className="text-center py-8 text-sm text-white/30">Loading...</div>
            ) : todaySessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-white/30">No sessions today.</p>
                <a href="/schedule" className="text-xs text-violet-400 hover:text-violet-300 transition-colors mt-2 inline-block">
                  Add a session →
                </a>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-white/5">
                {todaySessions.map((session) => (
                  <div key={session._id} className="flex items-center gap-4 py-3">
                    <div className="text-xs text-white/30 min-w-[56px]">{session.hour}</div>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${session.completed ? 'bg-green-400' : 'bg-violet-400'}`} />
                    <div className="flex-1">
                      <div className={`text-sm ${session.completed ? 'text-white/40 line-through' : 'text-white'}`}>
                        {session.subject}
                      </div>
                      <div className="text-xs text-white/30 mt-0.5">{session.duration} minutes</div>
                    </div>
                    <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[session.completed]}`}>
                      {statusLabels[session.completed]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subject breakdown */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Subject breakdown</h2>
              <a href="/progress" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Details →
              </a>
            </div>
            {loading ? (
              <div className="text-center py-8 text-sm text-white/30">Loading...</div>
            ) : topSubjects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-white/30">No sessions recorded yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {topSubjects.map(([name, hours], index) => {
                  const pct = Math.round((hours / maxSubjectHours) * 100)
                  const color = subjectColors[index % subjectColors.length]
                  return (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/70">{name}</span>
                        <span className={color.text}>{Math.round(hours * 10) / 10}h</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${color.bar}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">

          {/* Streak widget */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Streak</h2>
              <a href="/streak" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                History →
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Icon name="flame" size={20} />
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 leading-none">
                  {loading ? '...' : streak.currentStreak}
                </div>
                <div className="text-xs text-white/30 mt-1">Day streak</div>
              </div>
            </div>
            <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl px-3 py-2.5 text-center">
              <p className="text-xs text-violet-400">
                {streak.currentStreak > 0
                  ? `You're on a ${streak.currentStreak} day streak — keep it going!`
                  : 'Complete a session today to start your streak!'}
              </p>
            </div>
          </div>

          {/* Study tips */}
          <StudyTips />

        </div>
      </div>

    </DashboardLayout>
  )
}