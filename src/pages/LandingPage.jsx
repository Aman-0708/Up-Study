import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import CallToAction from '../components/landing/CallToAction'

export default function LandingPage() {
  return (
    <main className="bg-[#0f0f13] min-h-screen text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </main>
  )
}