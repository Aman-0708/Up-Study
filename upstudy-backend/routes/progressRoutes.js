const express = require('express')
const router = express.Router()
const { getProgress, logProgress, getStreak } = require('../controllers/progressController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getProgress)
router.post('/', protect, logProgress)
router.get('/streak', protect, getStreak)

module.exports = router