const Progress = require('../models/Progress')
const Session = require('../models/Session')

// @desc    Get progress for logged in user
// @route   GET /api/progress
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30)

    const sessions = await Session.find({ user: req.user._id })

    // Overall stats
    const totalHours = sessions.reduce((acc, s) => acc + s.duration / 60, 0)
    const totalSessions = sessions.length
    const completedSessions = sessions.filter((s) => s.completed).length

    // Weekly hours — current week Mon to Sun
    const today = new Date()
    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    const weeklyProgress = await Progress.find({
      user: req.user._id,
      date: { $gte: monday, $lte: sunday },
    })

    const weeklyHours = weeklyProgress.reduce((acc, p) => acc + p.hoursStudied, 0)
    const weeklyGoal = 20
    const weeklyGoalPct = Math.round((weeklyHours / weeklyGoal) * 100)

    const weeklySessions = weeklyProgress.reduce((acc, p) => acc + p.sessionsCompleted, 0)
    const sessionGoal = 15
    const sessionGoalPct = Math.round((weeklySessions / sessionGoal) * 100)

    // Subject breakdown from all sessions
    const subjectMap = {}
    sessions.forEach((s) => {
      if (!subjectMap[s.subject]) {
        subjectMap[s.subject] = 0
      }
      subjectMap[s.subject] += s.duration / 60
    })

    const subjectBreakdown = Object.entries(subjectMap).map(([name, hours]) => ({
      name,
      hours: Math.round(hours * 10) / 10,
    }))

    res.status(200).json({
      progress,
      stats: {
        totalHours: Math.round(totalHours * 10) / 10,
        totalSessions,
        completedSessions,
        weeklyHours: Math.round(weeklyHours * 10) / 10,
        weeklyGoal,
        weeklyGoalPct: Math.min(weeklyGoalPct, 100),
        weeklySessions,
        sessionGoal,
        sessionGoalPct: Math.min(sessionGoalPct, 100),
      },
      subjectBreakdown,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Log a progress entry for today
// @route   POST /api/progress
const logProgress = async (req, res) => {
  const { hoursStudied, sessionsCompleted, subjects } = req.body

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existing = await Progress.findOne({
      user: req.user._id,
      date: today,
    })

    if (existing) {
      existing.hoursStudied += hoursStudied || 0
      existing.sessionsCompleted += sessionsCompleted || 0
      existing.streakDay = true
      await existing.save()
      return res.status(200).json(existing)
    }

    const progress = await Progress.create({
      user: req.user._id,
      date: today,
      hoursStudied: hoursStudied || 0,
      sessionsCompleted: sessionsCompleted || 0,
      subjects: subjects || [],
      streakDay: true,
    })

    res.status(201).json(progress)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Get streak info for logged in user
// @route   GET /api/progress/streak
const getStreak = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
      streakDay: true,
    }).sort({ date: -1 })

    let currentStreak = 0
    let bestStreak = 0
    let tempStreak = 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < progress.length; i++) {
      const entryDate = new Date(progress[i].date)
      entryDate.setHours(0, 0, 0, 0)

      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)

      if (entryDate.getTime() === expectedDate.getTime()) {
        currentStreak++
        tempStreak++
        bestStreak = Math.max(bestStreak, tempStreak)
      } else {
        if (i === 0) currentStreak = 0
        tempStreak = 0
      }
    }

    res.status(200).json({ currentStreak, bestStreak })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getProgress, logProgress, getStreak }