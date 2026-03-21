const subjects = [
  { name: 'Mathematics', percentage: 78, color: 'bg-violet-500' },
  { name: 'Computer Science', percentage: 92, color: 'bg-teal-500' },
  { name: 'Physics', percentage: 61, color: 'bg-amber-500' },
  { name: 'English', percentage: 84, color: 'bg-green-500' },
]

export default function SubjectProgress() {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Subject progress</h2>
        <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
          Details →
        </a>
      </div>
      <div className="flex flex-col gap-4">
        {subjects.map((subject) => (
          <div key={subject.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-white/70">{subject.name}</span>
              <span className="text-white/40">{subject.percentage}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${subject.color}`}
                style={{ width: `${subject.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}