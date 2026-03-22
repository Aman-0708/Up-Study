const express = require('express')
const router = express.Router()
const { getRoutines, createRoutine, updateRoutine, deleteRoutine } = require('../controllers/routineController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getRoutines)
router.post('/', protect, createRoutine)
router.put('/:id', protect, updateRoutine)
router.delete('/:id', protect, deleteRoutine)

module.exports = router