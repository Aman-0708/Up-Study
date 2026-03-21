import Icon from '../Icon'

const stats = [
  { icon: 'book', value: '24h', label: 'Studied this week', change: '↑ 3h vs last week', color: 'text-violet-400 bg-violet-600/10' },
  { icon: 'check', value: '18', label: 'Sessions completed', change: '↑ 5 vs last week', color: 'text-teal-400 bg-teal-500/10' },
  { icon: 'flame', value: '7', label: 'Day streak', change: 'Personal best!', color: 'text-amber-400 bg-amber-500/10' },
  { icon: 'target', value: '82%', label: 'Goal completion', change: '↑ 12% vs last week', color: 'text-green-400 bg-green-500/10' },
]

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
            <Icon name={stat.icon} size={18} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-white/40">{stat.label}</div>
          <div className="text-xs text-green-400 mt-2">{stat.change}</div>
        </div>
      ))}
    </div>
  )
}