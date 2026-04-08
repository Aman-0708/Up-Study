const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/routines', require('./routes/routineRoutes'))
app.use('/api/sessions', require('./routes/sessionRoutes'))
app.use('/api/progress', require('./routes/progressRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))
// Base route
app.get('/', (req, res) => {
  res.json({ message: 'StudyFlow API is running' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})