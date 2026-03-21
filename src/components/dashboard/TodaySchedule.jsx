const sessions = [
  {
    time: '8:00 AM',
    subject: 'Mathematics — Calculus',
    duration: '90 minutes',
    status: 'done',
    color: 'bg-green-400',
  },
  {
    time: '11:00 AM',
    subject: 'Computer Science — Data Structures',
    duration: '60 minutes',
    status: 'active',
    color: 'bg-violet-400',
  },
  {
    time: '2:00 PM',
    subject: 'Physics — Thermodynamics',
    duration: '45 minutes',
    status: 'upcoming',
    color: 'bg-amber-400',
  },
  {
    time: '4:30 PM',
    subject: 'English — Essay Writing',
    duration: '30 minutes',
    status: 'upcoming',
    color: 'bg-teal-400',
  },
]

const statusStyles = {
  done: 'bg-green-500/10 text-green-400',
  active: 'bg-violet-500/10 text-violet-400',
  upcoming: 'bg-white/5 text-white/30',
}

const statusLabels = {
  done: 'Done',
  active: 'In progress',
  upcoming: 'Upcoming',
}

export default function TodaySchedule() {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Today's schedule</h2>
        <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
          View all →
        </a>
      </div>
      <div className="flex flex-col divide-y divide-white/5">
        {sessions.map((session) => (
          <div key={session.time} className="flex items-center gap-4 py-3">
            <div className="text-xs text-white/30 min-w-[56px]">{session.time}</div>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${session.color}`} />
            <div className="flex-1">
              <div className="text-sm text-white">{session.subject}</div>
              <div className="text-xs text-white/30 mt-0.5">{session.duration}</div>
            </div>
            <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[session.status]}`}>
              {statusLabels[session.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}