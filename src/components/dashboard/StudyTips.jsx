import Icon from '../Icon'

const tips = [
  { icon: 'clock', text: 'Try the Pomodoro technique: 25 min focused study, 5 min break.' },
  { icon: 'book', text: "Review yesterday's notes before starting a new topic." },
  { icon: 'target', text: 'Set a specific goal before each study session.' },
]

export default function StudyTips() {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mt-4">
      <h2 className="text-base font-semibold text-white mb-5">Quick tips</h2>
      <div className="flex flex-col gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/10 text-violet-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={tip.icon} size={15} />
            </div>
            <p className="text-sm text-white/40 leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}