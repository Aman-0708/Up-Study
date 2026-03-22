const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    day: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 15,
    },
    color: {
      type: String,
      default: 'violet',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Session', sessionSchema)