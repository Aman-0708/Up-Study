import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Routines from './pages/Routines'
import Schedule from './pages/Schedule'
import Streak from './pages/Streak'
import Progress from './pages/Progress'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </BrowserRouter>
  )
}