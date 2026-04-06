import { useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { api } from '../utils/api'
import Icon from '../components/Icon'

const weeklyData = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 2 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 2.5 },
  { day: 'Sun', hours: 1.5 },
]



const statusColors = {
  Exceeded: 'bg-green-500/10 text-green-400',
  'On track': 'bg-violet-600/10 text-violet-400',
  Behind: 'bg-red-500/10 text-red-400',
}

export default function Progress() {
  const [stats, setStats] = useState(null)
  const [weeklyData, setWeeklyData] = useState([])
  const [subjectBreakdown, setSubjectBreakdown] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await api('/progress', 'GET', null, token)

        setStats(data.stats)
        setSubjectBreakdown(data.subjectBreakdown || [])

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const today = new Date()
        const dayOfWeek = today.getDay()
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

        const weekDays = days.map((day, index) => {
          const date = new Date(today)
          date.setDate(today.getDate() + mondayOffset + index)
          date.setHours(0, 0, 0, 0)

          const entry = data.progress.find((p) => {
            const entryDate = new Date(p.date)
            entryDate.setHours(0, 0, 0, 0)
            return entryDate.getTime() === date.getTime()
          })

          return {
            day,
            hours: entry ? Math.round(entry.hoursStudied * 10) / 10 : 0,
          }
        })

        setWeeklyData(weekDays)
      } catch (error) {
        console.error('Failed to fetch progress:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  const maxHours = weeklyData.length > 0
    ? Math.max(...weeklyData.map((d) => d.hours), 1)
    : 1

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Progress</h1>
        <p className="text-sm text-white/40 mt-1">
          Track your study performance over time
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mb-3">
            <Icon name="book" size={18} />
          </div>
          <div className="text-2xl font-bold text-white">
            {loading ? '...' : `${stats?.totalHours || 0}h`}
          </div>
          <div className="text-xs text-white/40 mt-1">Total hours</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3">
            <Icon name="check" size={18} />
          </div>
          <div className="text-2xl font-bold text-white">
            {loading ? '...' : stats?.totalSessions || 0}
          </div>
          <div className="text-xs text-white/40 mt-1">Total sessions</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Icon name="clock" size={18} />
          </div>
          <div className="text-2xl font-bold text-white">
            {loading ? '...' : stats?.completedSessions || 0}
          </div>
          <div className="text-xs text-white/40 mt-1">Completed</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-3">
            <Icon name="target" size={18} />
          </div>
          <div className="text-2xl font-bold text-white">
            {loading ? '...' : `${stats?.totalSessions > 0
              ? Math.round((stats?.completedSessions / stats?.totalSessions) * 100)
              : 0}%`}
          </div>
          <div className="text-xs text-white/40 mt-1">Completion rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Weekly bar chart */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">
            Hours studied this week
          </h2>
          {loading ? (
            <div className="text-center py-10 text-sm text-white/30">Loading...</div>
          ) : (
            <div className="flex items-end gap-3 h-36">
              {weeklyData.map((d) => {
                const heightPct = (d.hours / maxHours) * 100
                const isToday = d.day === today
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-white/30">{d.hours}h</div>
                    <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                      <div
                        className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-violet-500' : 'bg-violet-600/30'}`}
                        style={{ height: `${heightPct}%`, minHeight: d.hours > 0 ? '4px' : '0' }}
                      />
                    </div>
                    <div className={`text-xs ${isToday ? 'text-violet-400' : 'text-white/30'}`}>
                      {d.day}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Goal completion */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">
            Goal completion
          </h2>
          {loading ? (
            <div className="text-center py-10 text-sm text-white/30">Loading...</div>
          ) : (
            <div className="flex flex-col gap-5">

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Weekly hours goal (20h)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/40">{stats?.weeklyGoalPct || 0}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stats?.weeklyGoalPct >= 100 ? 'bg-green-500/10 text-green-400' : 'bg-violet-600/10 text-violet-400'}`}>
                      {stats?.weeklyGoalPct >= 100 ? 'Exceeded' : 'On track'}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${stats?.weeklyGoalPct || 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Sessions completed (goal: 15)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/40">{stats?.sessionGoalPct || 0}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stats?.sessionGoalPct >= 100 ? 'bg-green-500/10 text-green-400' : 'bg-violet-600/10 text-violet-400'}`}>
                      {stats?.sessionGoalPct >= 100 ? 'Exceeded' : 'On track'}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${stats?.sessionGoalPct || 0}%` }} />
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Subject breakdown */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-6">
          Subject breakdown
        </h2>
        {loading ? (
          <div className="text-center py-10 text-sm text-white/30">Loading...</div>
        ) : subjectBreakdown.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-white/30">No sessions recorded yet.</p>
            <p className="text-xs text-white/20 mt-1">Add sessions to see your subject breakdown.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subjectBreakdown.map((subject, index) => {
              const colors = ['bg-violet-500', 'bg-teal-500', 'bg-amber-500', 'bg-green-500', 'bg-pink-500']
              const textColors = ['text-violet-400', 'text-teal-400', 'text-amber-400', 'text-green-400', 'text-pink-400']
              const color = colors[index % colors.length]
              const textColor = textColors[index % textColors.length]
              const maxHours = Math.max(...subjectBreakdown.map((s) => s.hours), 1)
              const percentage = Math.round((subject.hours / maxHours) * 100)
              return (
                <div key={subject.name} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                      <span className="text-sm text-white">{subject.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${textColor}`}>
                      {subject.hours}h
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </DashboardLayout>
  )
}