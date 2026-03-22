const Routine = require('../models/Routine')

// @desc    Get all routines for logged in user
// @route   GET /api/routines
const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json(routines)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Create a new routine
// @route   POST /api/routines
const createRoutine = async (req, res) => {
  const { name, subject, topic, time, duration, days, color } = req.body

  try {
    if (!name || !subject || !days || days.length === 0) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    const routine = await Routine.create({
      user: req.user._id,
      name,
      subject,
      topic,
      time,
      duration,
      days,
      color,
    })

    res.status(201).json(routine)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Update a routine
// @route   PUT /api/routines/:id
const updateRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id)

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' })
    }

    if (routine.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const updated = await Routine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Delete a routine
// @route   DELETE /api/routines/:id
const deleteRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id)

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' })
    }

    if (routine.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await routine.deleteOne()
    res.status(200).json({ message: 'Routine deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getRoutines, createRoutine, updateRoutine, deleteRoutine }