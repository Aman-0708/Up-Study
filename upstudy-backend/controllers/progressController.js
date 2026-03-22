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

    const totalHours = sessions.reduce((acc, s) => acc + s.duration / 60, 0)
    const totalSessions = sessions.length
    const completedSessions = sessions.filter((s) => s.completed).length

    res.status(200).json({
      progress,
      stats: {
        totalHours: Math.round(totalHours * 10) / 10,
        totalSessions,
        completedSessions,
      },
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