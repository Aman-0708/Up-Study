const express = require('express')
const router = express.Router()
const {
  getMaterials,
  uploadMaterial,
  deleteMaterial,
  incrementDownload,
} = require('../controllers/materialController')
const { protect, lecturerOnly } = require('../middleware/authMiddleware')
const { upload } = require('../config/cloudinary')

router.get('/', protect, getMaterials)

router.post('/', protect, lecturerOnly, (req, res, next) => {
  console.log('Before upload middleware')
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary error:', err)
      return res.status(500).json({ message: err.message })
    }
    console.log('After upload middleware')
    next()
  })
}, uploadMaterial)

router.delete('/:id', protect, deleteMaterial)
router.put('/:id/download', protect, incrementDownload)

module.exports = router