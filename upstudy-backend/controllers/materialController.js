const Material = require('../models/Material')
const { cloudinary } = require('../config/cloudinary')

// @desc    Get all materials
// @route   GET /api/materials
const getMaterials = async (req, res) => {
  try {
    const { subject } = req.query
    const filter = subject ? { subject: { $regex: subject, $options: 'i' } } : {}
    const materials = await Material.find(filter).sort({ createdAt: -1 })
    res.status(200).json(materials)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Upload a material
// @route   POST /api/materials
const uploadMaterial = async (req, res) => {
  try {
    console.log('Upload hit')
    console.log('File:', req.file)
    console.log('Body:', req.body)

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' })
    }

    const { title, description, subject } = req.body

    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required' })
    }

    // Upload to Cloudinary manually from buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'studyflow/materials',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      stream.end(req.file.buffer)
    })

    console.log('Cloudinary upload result:', uploadResult)

    const material = await Material.create({
      title,
      description,
      subject,
      fileUrl: uploadResult.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadResult.public_id,
      uploadedBy: req.user._id,
      uploaderName: `${req.user.firstName} ${req.user.lastName}`,
      uploaderRole: req.user.role,
    })

    res.status(201).json(material)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Delete a material
// @route   DELETE /api/materials/:id
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)

    if (!material) {
      return res.status(404).json({ message: 'Material not found' })
    }

    if (material.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await cloudinary.uploader.destroy(material.publicId, { resource_type: 'raw' })
    await material.deleteOne()

    res.status(200).json({ message: 'Material deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Increment download count
// @route   PUT /api/materials/:id/download
const incrementDownload = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    )
    res.status(200).json(material)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getMaterials, uploadMaterial, deleteMaterial, incrementDownload }