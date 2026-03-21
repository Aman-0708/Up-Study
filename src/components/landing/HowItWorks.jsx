import FadeIn from '../FadeIn'
import Icon from '../Icon'

const steps = [
  {
    number: '01',
    icon: 'user',
    title: 'Create your account',
    description: 'Sign up in seconds. Enter your name, email, and university details to get started.',
  },
  {
    number: '02',
    icon: 'repeat',
    title: 'Build your routines',
    description: 'Add your subjects, set study durations, and pick the days you want to study each one.',
  },
  {
    number: '03',
    icon: 'calendar',
    title: 'Follow your schedule',
    description: 'Your personalized schedule is ready. Show up daily, log sessions, and stay consistent.',
  },
  {
    number: '04',
    icon: 'chart',
    title: 'Track your progress',
    description: 'Watch your streak grow, hit your goals, and review weekly reports to see your improvement.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide uppercase">
              How it works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Up and running in minutes
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              No complicated setup. Just four simple steps to better study habits.
            </p>
          </div>
        </FadeIn>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <FadeIn key={step.number} direction="up" delay={index * 100}>
              <div className="relative">

                {/* Connector line — desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[65%] w-full h-px bg-white/5 z-0" />
                )}

                <div className="relative z-10 bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-full hover:border-white/10 transition-colors">

                  {/* Icon + number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
                      <Icon name={step.icon} size={20} />
                    </div>
                    <span className="text-4xl font-bold text-white/5 select-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {step.description}
                  </p>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}