import DashboardLayout from '../components/dashboard/DashboardLayout'
import Icon from '../components/Icon'

const currentStreak = 7
const bestStreak = 12
const totalDaysThisMonth = 21

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const weekCompleted = [true, true, true, true, true, true, true]

const months = [
  {
    name: 'March 2026',
    days: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      studied: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 21].includes(i + 1),
      today: i + 1 === 21,
    })),
    startDay: 0,
  },
]

const achievements = [
  {
    iconName: 'flame',
    name: '7-Day Streak',
    desc: 'Studied 7 days in a row',
    unlocked: true,
    color: 'bg-amber-500/15 border-amber-500/20',
  },
  {
    iconName: 'target',
    name: 'Goal Crusher',
    desc: 'Exceeded weekly goal',
    unlocked: true,
    color: 'bg-green-500/15 border-green-500/20',
  },
  {
    iconName: 'star',
    name: '14-Day Streak',
    desc: 'Study 14 days in a row',
    unlocked: false,
    color: 'bg-white/5 border-white/10',
  },
  {
    iconName: 'trophy',
    name: '30-Day Warrior',
    desc: 'Study 30 days in a row',
    unlocked: false,
    color: 'bg-white/5 border-white/10',
  },
  {
    iconName: 'diamond',
    name: '100 Hours',
    desc: 'Complete 100 study hours',
    unlocked: false,
    color: 'bg-white/5 border-white/10',
  },
  {
    iconName: 'star',
    name: 'Perfect Month',
    desc: 'Study every day in a month',
    unlocked: false,
    color: 'bg-white/5 border-white/10',
  },
]

export default function Streak() {
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
          <div className="text-4xl mb-1"> <Icon name="flame" size={20} /></div>
          <div className="text-3xl font-bold text-amber-400">{currentStreak}</div>
          <div className="text-sm text-white/40 mt-1">Current streak</div>
        </div>
        <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-1"> <Icon name="star" size={20} /></div>
          <div className="text-3xl font-bold text-violet-400">{bestStreak}</div>
          <div className="text-sm text-white/40 mt-1">Best streak</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-1"><Icon name="calendar" size={20} /></div>
          <div className="text-3xl font-bold text-green-400">{totalDaysThisMonth}</div>
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
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-center">
            <Icon name="check" size={14} className="text-green-400" />
            <p className="text-sm font-medium text-green-400">
               Full week completed!
            </p>
            <p className="text-xs text-white/40 mt-1">
              You studied every day this week. Keep it up!
            </p>
          </div>
        </div>

        {/* Monthly calendar */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">
            {months[0].name}
          </h2>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="text-center text-[10px] text-white/20 font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for start day */}
            {Array.from({ length: months[0].startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {months[0].days.map((d) => (
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

          {/* Legend */}
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
          {achievements.map((ach) => (
            <div
              key={ach.name}
              className={`border rounded-xl p-4 flex items-center gap-3 transition-all
                ${ach.unlocked ? ach.color : 'bg-white/[0.02] border-white/5 opacity-50'}`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                  ${ach.unlocked ? ach.color : 'bg-white/5'}`}
              >
                {ach.icon}
              </div>
              <div>
                <div className={`text-sm font-medium ${ach.unlocked ? 'text-white' : 'text-white/40'}`}>
                  {ach.name}
                </div>
                <div className="text-xs text-white/30 mt-0.5">{ach.desc}</div>
                {ach.unlocked && (
                  <div className="text-xs text-green-400 mt-1">✓ Unlocked</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </DashboardLayout>
  )
}