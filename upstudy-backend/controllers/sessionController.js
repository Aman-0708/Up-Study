const Session = require('../models/Session')
const Progress = require('../models/Progress')


// @desc    Get all sessions for logged in user
// @route   GET /api/sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json(sessions)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Create a new session
// @route   POST /api/sessions
const createSession = async (req, res) => {
  const { subject, day, hour, duration, color } = req.body
  console.log('Request body:', req.body)
  console.log('Subject:', subject, 'Day:', day, 'Hour:', hour)

  try {
    if (!subject || !day || !hour) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    const session = await Session.create({
      user: req.user._id,
      subject,
      day,
      hour,
      duration,
      color,
    })

    res.status(201).json(session)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Update a session / mark as complete
// @route   PUT /api/sessions/:id
const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)

    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    // If session is being marked as complete log progress
    if (req.body.completed === true && !session.completed) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const existing = await Progress.findOne({
        user: req.user._id,
        date: today,
      })

      const hoursStudied = session.duration / 60

      if (existing) {
        existing.hoursStudied += hoursStudied
        existing.sessionsCompleted += 1
        existing.streakDay = true
        await existing.save()
      } else {
        await Progress.create({
          user: req.user._id,
          date: today,
          hoursStudied,
          sessionsCompleted: 1,
          subjects: [{ name: session.subject, hours: hoursStudied }],
          streakDay: true,
        })
      }
    }

    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Delete a session
// @route   DELETE /api/sessions/:id
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)

    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await session.deleteOne()
    res.status(200).json({ message: 'Session deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getSessions, createSession, updateSession, deleteSession }