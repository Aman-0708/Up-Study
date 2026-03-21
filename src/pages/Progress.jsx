import DashboardLayout from '../components/dashboard/DashboardLayout'

const weeklyData = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 2 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 2.5 },
  { day: 'Sun', hours: 1.5 },
]

const subjects = [
  { name: 'Mathematics', hours: 8, goal: 10, percentage: 78, color: 'bg-violet-500', light: 'text-violet-400' },
  { name: 'Computer Science', hours: 9, goal: 10, percentage: 92, color: 'bg-teal-500', light: 'text-teal-400' },
  { name: 'Physics', hours: 5, goal: 8, percentage: 61, color: 'bg-amber-500', light: 'text-amber-400' },
  { name: 'English', hours: 6, goal: 7, percentage: 84, color: 'bg-green-500', light: 'text-green-400' },
]

const goals = [
  { label: 'Weekly hours goal (20h)', percentage: 120, color: 'bg-green-500', status: 'Exceeded' },
  { label: 'Sessions completed (15)', percentage: 82, color: 'bg-violet-500', status: 'On track' },
  { label: 'Routine consistency', percentage: 90, color: 'bg-teal-500', status: 'On track' },
]

const maxHours = Math.max(...weeklyData.map((d) => d.hours))

const statusColors = {
  Exceeded: 'bg-green-500/10 text-green-400',
  'On track': 'bg-violet-600/10 text-violet-400',
  'Behind': 'bg-red-500/10 text-red-400',
}

export default function Progress() {
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
          <div className="text-xl mb-2">📚</div>
          <div className="text-2xl font-bold text-white">24h</div>
          <div className="text-xs text-white/40 mt-1">This week</div>
          <div className="text-xs text-green-400 mt-1.5">↑ 3h vs last week</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="text-xl mb-2">✅</div>
          <div className="text-2xl font-bold text-white">18</div>
          <div className="text-xs text-white/40 mt-1">Sessions done</div>
          <div className="text-xs text-green-400 mt-1.5">↑ 5 vs last week</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="text-xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-white">1.3h</div>
          <div className="text-xs text-white/40 mt-1">Avg per session</div>
          <div className="text-xs text-white/20 mt-1.5">Steady</div>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className="text-xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-white">82%</div>
          <div className="text-xs text-white/40 mt-1">Goal completion</div>
          <div className="text-xs text-green-400 mt-1.5">↑ 12% vs last week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Weekly bar chart */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">
            Hours studied this week
          </h2>
          <div className="flex items-end gap-3 h-36">
            {weeklyData.map((d) => {
              const heightPct = (d.hours / maxHours) * 100
              const isToday = d.day === new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs text-white/30">{d.hours}h</div>
                  <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                    <div
                      className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-violet-500' : 'bg-violet-600/30'}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <div className={`text-xs ${isToday ? 'text-violet-400' : 'text-white/30'}`}>
                    {d.day}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Goal completion */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">
            Goal completion
          </h2>
          <div className="flex flex-col gap-5">
            {goals.map((goal) => (
              <div key={goal.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">{goal.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/40">
                      {Math.min(goal.percentage, 100)}%
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[goal.status]}`}>
                      {goal.status}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${goal.color} transition-all`}
                    style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Subject breakdown */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-6">
          Subject breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <div key={subject.name} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${subject.color}`} />
                  <span className="text-sm text-white">{subject.name}</span>
                </div>
                <span className={`text-sm font-medium ${subject.light}`}>
                  {subject.hours}h / {subject.goal}h
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${subject.color} transition-all`}
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30">{subject.percentage}% of weekly goal</span>
                <span className={`text-xs ${subject.percentage >= 80 ? 'text-green-400' : subject.percentage >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                  {subject.percentage >= 80 ? 'On track' : subject.percentage >= 60 ? 'Needs work' : 'Behind'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </DashboardLayout>
  )
}