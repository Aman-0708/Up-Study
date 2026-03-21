import FadeIn from '../FadeIn'
import Icon from '../Icon'

const features = [
  {
    icon: 'calendar',
    title: 'Smart scheduling',
    description: 'Create personalized study schedules based on your subjects, goals, and available time.',
    color: 'text-violet-400 bg-violet-600/10 border-violet-500/20',
  },
  {
    icon: 'flame',
    title: 'Streak tracking',
    description: 'Stay motivated with a daily streak system that rewards you for showing up consistently.',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: 'chart',
    title: 'Progress reports',
    description: 'See how far you have come with weekly summaries, subject breakdowns, and goal completion rates.',
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: 'bell',
    title: 'Study reminders',
    description: 'Never miss a session. Get notified before each scheduled study block so you stay on track.',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: 'repeat',
    title: 'Routine builder',
    description: 'Build repeatable study routines for each subject and assign them to specific days of the week.',
    color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: 'target',
    title: 'Goal setting',
    description: 'Set daily and weekly study hour goals and track how consistently you hit them over time.',
    color: 'text-green-400 bg-green-500/10 border-green-500/20',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide uppercase">
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Everything you need to study smarter
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              All the tools to build better habits, in one clean and simple app.
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} direction="up" delay={index * 80}>
              <div className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 h-full">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 ${feature.color}`}>
                  <Icon name={feature.icon} size={18} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}