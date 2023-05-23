import { Schema } from "mongoose";

const mongoose = require('mongoose');

interface IWorkoutCalendar {
  user: Schema.Types.ObjectId,
  date: Date,
  workout: Schema.Types.ObjectId
}

const WorkoutCalSchema = new Schema<IWorkoutCalendar>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  date: {
    type: Date,
    required: true,
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
    required: true,
},
}, { timestamps: true });

const WorkoutCalendar = mongoose.model('WorkoutCalendar', WorkoutCalSchema);

export default WorkoutCalendar;