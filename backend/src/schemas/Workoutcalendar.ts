import { Document, Schema } from "mongoose";

const mongoose = require("mongoose");

export interface IWorkoutCalendar extends Document {
  user: Schema.Types.ObjectId;
  date: Date;
  workout: Schema.Types.ObjectId;
  completed: boolean;
}

const WorkoutCalSchema = new Schema<IWorkoutCalendar>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const WorkoutCalendar = mongoose.model("WorkoutCalendar", WorkoutCalSchema);

export default WorkoutCalendar;
