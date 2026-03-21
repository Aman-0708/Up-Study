const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up in seconds. Enter your name, email, and university details to get started.",
    icon: "👤",
  },
  {
    number: "02",
    title: "Build your routines",
    description:
      "Add your subjects, set study durations, and pick the days you want to study each one.",
    icon: "🔄",
  },
  {
    number: "03",
    title: "Follow your schedule",
    description:
      "Your personalized schedule is ready. Show up daily, log your sessions, and stay consistent.",
    icon: "📅",
  },
  {
    number: "04",
    title: "Track your progress",
    description:
      "Watch your streak grow, hit your goals, and review weekly reports to see your improvement.",
    icon: "📈",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-sm px-4 py-1.5 rounded-full mb-6">
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Up and running in minutes
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            No complicated setup. Just four simple steps to better study habits.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-white/5 z-0" />
              )}

              <div className="relative z-10 bg-white/[0.03] border border-white/5 rounded-2xl p-6 h-full">

                {/* Step number + icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center text-xl">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-white/5">
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-white font-semibold text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}