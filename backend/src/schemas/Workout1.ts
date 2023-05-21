const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  date: {
    type: Date,
    required: true,
  },
  workoutName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.model('Workout', workoutSchema);