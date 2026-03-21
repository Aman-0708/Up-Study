import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 pt-16">
            <div className="max-w-4xl mx-auto text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-violet-600/15 border border-violet-500/20 text-violet-400 text-sm px-4 py-1.5 rounded-full mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    Built for university students
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                    Build habits that{" "}
                    <span className="text-violet-400">
                        actually stick
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
                    StudyFlow helps you create study routines, track your progress,
                    and stay consistent — one session at a time.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/register"
                        className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors">
                        Get started for free
                    </Link>
                    <Link
                        to="/login"
                        className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors">
                        See how it works →
                    </Link>
                </div>

                {/* Stats row */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
                    <div>
                        <div className="text-2xl font-bold text-white">2,400+</div>
                        <div className="text-sm text-white/40 mt-1">Active students</div>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                    <div>
                        <div className="text-2xl font-bold text-white">98%</div>
                        <div className="text-sm text-white/40 mt-1">Consistency rate</div>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                    <div>
                        <div className="text-2xl font-bold text-white">50k+</div>
                        <div className="text-sm text-white/40 mt-1">Sessions completed</div>
                    </div>
                </div>

            </div>
        </section >
    )
}