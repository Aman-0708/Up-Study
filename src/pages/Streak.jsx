import { useState, useEffect } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { api } from '../utils/api'
import Icon from '../components/Icon'

const achievements = [
  { iconName: 'flame', name: '7-Day Streak', desc: 'Studied 7 days in a row', unlocked: false, color: 'bg-amber-500/15 border-amber-500/20', iconColor: 'text-amber-400 bg-amber-500/20' },
  { iconName: 'target', name: 'Goal Crusher', desc: 'Exceeded weekly goal', unlocked: false, color: 'bg-green-500/15 border-green-500/20', iconColor: 'text-green-400 bg-green-500/20' },
  { iconName: 'star', name: '14-Day Streak', desc: 'Study 14 days in a row', unlocked: false, color: 'bg-white/5 border-white/10', iconColor: 'text-white/20 bg-white/5' },
  { iconName: 'chart', name: '30-Day Warrior', desc: 'Study 30 days in a row', unlocked: false, color: 'bg-white/5 border-white/10', iconColor: 'text-white/20 bg-white/5' },
  { iconName: 'clock', name: '100 Hours', desc: 'Complete 100 study hours', unlocked: false, color: 'bg-white/5 border-white/10', iconColor: 'text-white/20 bg-white/5' },
  { iconName: 'calendar', name: 'Perfect Month', desc: 'Study every day in a month', unlocked: false, color: 'bg-white/5 border-white/10', iconColor: 'text-white/20 bg-white/5' },
]

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Streak() {
  const [streakData, setStreakData] = useState({ currentStreak: 0, bestStreak: 0 })
  const [progressDates, setProgressDates] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const [streakRes, progressRes] = await Promise.all([
          api('/progress/streak', 'GET', null, token),
          api('/progress', 'GET', null, token),
        ])
        setStreakData(streakRes)
        setProgressDates(progressRes.progress.map((p) => new Date(p.date)))
      } catch (error) {
        console.error('Failed to fetch streak:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStreak()
  }, [])

  const getWeekCompleted = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

    return weekDays.map((_, index) => {
      const date = new Date(today)
      date.setDate(today.getDate() + mondayOffset + index)
      date.setHours(0, 0, 0, 0)

      return progressDates.some((p) => {
        const pd = new Date(p)
        pd.setHours(0, 0, 0, 0)
        return pd.getTime() === date.getTime()
      })
    })
  }

  const getMonthData = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const startDay = firstDay === 0 ? 6 : firstDay - 1

    return {
      days: Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1)
        date.setHours(0, 0, 0, 0)
        const studied = progressDates.some((p) => {
          const pd = new Date(p)
          pd.setHours(0, 0, 0, 0)
          return pd.getTime() === date.getTime()
        })
        return {
          day: i + 1,
          studied,
          today: i + 1 === today.getDate(),
        }
      }),
      startDay,
      name: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    }
  }

  const weekCompleted = getWeekCompleted()
  const monthData = getMonthData()
  const allWeekDone = weekCompleted.every(Boolean)

  const totalDaysThisMonth = progressDates.filter((p) => {
    const d = new Date(p)
    const today = new Date()
    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    )
  }).length

  const unlockedAchievements = achievements.map((ach) => ({
    ...ach,
    unlocked:
      (ach.name === '7-Day Streak' && streakData.currentStreak >= 7) ||
      (ach.name === '14-Day Streak' && streakData.currentStreak >= 14) ||
      (ach.name === '30-Day Warrior' && streakData.currentStreak >= 30) ||
      (ach.name === 'Perfect Month' && totalDaysThisMonth >= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()),
  }))

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Streak</h1>
        <p className="text-sm text-white/40 mt-1">
          Track your consistency and study habits
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <Icon name="flame" size={20} />
          </div>
          <div className="text-3xl font-bold text-amber-400">
            {loading ? '...' : streakData.currentStreak}
          </div>
          <div className="text-sm text-white/40 mt-1">Current streak</div>
        </div>
        <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mx-auto mb-3">
            <Icon name="star" size={20} />
          </div>
          <div className="text-3xl font-bold text-violet-400">
            {loading ? '...' : streakData.bestStreak}
          </div>
          <div className="text-sm text-white/40 mt-1">Best streak</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3">
            <Icon name="calendar" size={20} />
          </div>
          <div className="text-3xl font-bold text-green-400">
            {loading ? '...' : totalDaysThisMonth}
          </div>
          <div className="text-sm text-white/40 mt-1">Days this month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* This week */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">This week</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-all
                    ${weekCompleted[index]
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/5 text-white/20'
                    }`}
                >
                  {day}
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${weekCompleted[index] ? 'bg-violet-400' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>
          {allWeekDone ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <Icon name="check" size={14} className="text-green-400" />
                <p className="text-sm font-medium text-green-400">Full week completed!</p>
              </div>
              <p className="text-xs text-white/40 mt-1">
                You studied every day this week. Keep it up!
              </p>
            </div>
          ) : (
            <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl px-4 py-3 text-center">
              <p className="text-sm font-medium text-violet-400">
                {weekCompleted.filter(Boolean).length} of 7 days studied
              </p>
              <p className="text-xs text-white/40 mt-1">
                Keep going — you can complete the week!
              </p>
            </div>
          )}
        </div>

        {/* Monthly calendar */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">
            {monthData.name}
          </h2>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="text-center text-[10px] text-white/20 font-medium py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthData.startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {monthData.days.map((d) => (
              <div
                key={d.day}
                className={`aspect-square rounded-lg flex items-center justify-center text-[11px] font-medium transition-all
                  ${d.today
                    ? 'ring-2 ring-violet-400 bg-violet-600/20 text-violet-300'
                    : d.studied
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/5 text-white/20'
                  }`}
              >
                {d.day}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-violet-600" />
              <span className="text-xs text-white/30">Studied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-white/5 ring-1 ring-violet-400" />
              <span className="text-xs text-white/30">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-white/5" />
              <span className="text-xs text-white/30">Missed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Achievements */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-5">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map((ach) => (
            <div
              key={ach.name}
              className={`border rounded-xl p-4 flex items-center gap-3 transition-all
                ${ach.unlocked ? ach.color : 'bg-white/[0.02] border-white/5 opacity-50'}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${ach.iconColor}`}>
                <Icon name={ach.iconName} size={20} />
              </div>
              <div>
                <div className={`text-sm font-medium ${ach.unlocked ? 'text-white' : 'text-white/40'}`}>
                  {ach.name}
                </div>
                <div className="text-xs text-white/30 mt-0.5">{ach.desc}</div>
                {ach.unlocked && (
                  <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
                    <Icon name="check" size={11} />
                    Unlocked
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </DashboardLayout>
  )
}