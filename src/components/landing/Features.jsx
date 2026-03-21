const features = [
  {
    icon: "🗓️",
    title: "Smart scheduling",
    description:
      "Create personalized study schedules based on your subjects, goals, and available time.",
    color: "bg-violet-600/15 border-violet-500/20 text-violet-400",
  },
  {
    icon: "🔥",
    title: "Streak tracking",
    description:
      "Stay motivated with a daily streak system that rewards you for showing up consistently.",
    color: "bg-amber-500/15 border-amber-500/20 text-amber-400",
  },
  {
    icon: "📈",
    title: "Progress reports",
    description:
      "See how far you've come with weekly summaries, subject breakdowns, and goal completion rates.",
    color: "bg-teal-500/15 border-teal-500/20 text-teal-400",
  },
  {
    icon: "⏰",
    title: "Study reminders",
    description:
      "Never miss a session. Get notified before each scheduled study block so you stay on track.",
    color: "bg-blue-500/15 border-blue-500/20 text-blue-400",
  },
  {
    icon: "🔄",
    title: "Routine builder",
    description:
      "Build repeatable study routines for each subject and assign them to specific days of the week.",
    color: "bg-pink-500/15 border-pink-500/20 text-pink-400",
  },
  {
    icon: "🎯",
    title: "Goal setting",
    description:
      "Set daily and weekly study hour goals and track how consistently you hit them over time.",
    color: "bg-green-500/15 border-green-500/20 text-green-400",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-sm px-4 py-1.5 rounded-full mb-6">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Everything you need to study smarter
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            All the tools to build better habits, in one clean and simple app.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-200"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl mb-5 ${feature.color}`}>
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-white font-semibold text-base mb-2">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}