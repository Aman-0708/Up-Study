import DashboardLayout from '../components/dashboard/DashboardLayout'
import StatCards from '../components/dashboard/StatCards'
import TodaySchedule from '../components/dashboard/TodaySchedule'
import SubjectProgress from '../components/dashboard/SubjectProgress'
import StreakWidget from '../components/dashboard/StreakWidget'
import StudyTips from '../components/dashboard/StudyTips'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <DashboardLayout>

      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1540] to-[#1a1e40] border border-white/5 rounded-2xl px-8 py-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-1">
            {getGreeting()}, {user.firstName} 
          </h1>
          <p className="text-white/40 text-sm">
            You have 3 sessions scheduled for today. Keep up the momentum!
          </p>
          <div className="flex gap-3 mt-5">
            <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              Start session
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              View schedule
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <StatCards />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2">
          <TodaySchedule />
          <SubjectProgress />
        </div>

        {/* Right column */}
        <div>
          <StreakWidget />
          <StudyTips />
        </div>

      </div>

    </DashboardLayout>
  )
}