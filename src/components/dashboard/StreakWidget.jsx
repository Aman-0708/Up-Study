import Icon from '../Icon'

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const completed = [true, true, true, true, true, true, true]

export default function StreakWidget() {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Weekly streak</h2>
        <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
          History →
        </a>
      </div>

      {/* Streak count */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <Icon name="flame" size={20} />
        </div>
        <div>
          <div className="text-4xl font-bold text-amber-400 leading-none">7</div>
          <div className="text-xs text-white/30 mt-1">Day streak</div>
        </div>
      </div>

      {/* Day dots */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5">
            <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-medium
              ${completed[index] ? 'bg-violet-600 text-white' : 'bg-white/5 text-white/20'}`}>
              {day}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2 text-center">
        <p className="text-xs text-green-400 font-medium">Full week completed!</p>
      </div>
    </div>
  )
}