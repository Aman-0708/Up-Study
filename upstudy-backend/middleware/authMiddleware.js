const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  console.log('Auth header:', req.headers.authorization)

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      console.log('Token extracted:', token)

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log('Decoded token:', decoded)

      req.user = await User.findById(decoded.id).select('-password')
      console.log('User found:', req.user)

      next()
    } catch (error) {
      console.log('Auth error:', error.message)
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    console.log('No token found')
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

const lecturerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'lecturer') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied. Lecturers only.' })
  }
}

module.exports = { protect, lecturerOnly }