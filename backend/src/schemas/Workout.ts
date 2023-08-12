import { Document, Schema, model, Types } from "mongoose";
import Exercise from "./Exercise";

interface IExerciseDetails {
  exerciseId: Types.ObjectId;
  name: string,
  sets: number;
  reps: number;
  weight: number;
}

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string,
  description: string,
  duration: number,
  difficulty: string,
  exercises: IExerciseDetails[];
}

const exerciseDetailsSchema: Schema<IExerciseDetails> = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
  name: String,
  sets: Number,
  reps: Number,
  weight: Number,
});

const workoutSchema: Schema<IWorkout> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: {
    type: String,
    required: false
  },
  duration: {
    type: Number,
    required: false,
  },
  difficulty: { 
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'], 
    required: false 
  },
  exercises: [exerciseDetailsSchema],
});

const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout;
