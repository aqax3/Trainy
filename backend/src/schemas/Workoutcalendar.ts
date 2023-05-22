const mongoose = require('mongoose');

const WorkoutCalSchema = new mongoose.Schema({
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

export default WorkoutCalSchema

module.exports = mongoose.model('Workoutcalendar', WorkoutCalSchema);