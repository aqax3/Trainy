import { Document, Schema, model, Types } from "mongoose";

interface IExerciseDetails {
  exerciseId: Types.ObjectId;
  sets: number;
  reps: number;
  weight: number;
}

export interface IWorkout extends Document {
  userId: string;
  name: string,
  description: string,
  duration: number,
  difficulty: string,
  exercises: IExerciseDetails[];
}

const exerciseDetailsSchema: Schema<IExerciseDetails> = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
  sets: Number,
  reps: Number,
  weight: Number,
});

const workoutSchema: Schema<IWorkout> = new Schema({
  userId: String,
  name: String,
  description: String,
  duration: Number,
  difficulty: { 
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'], 
    required: true 
  },
  exercises: [exerciseDetailsSchema],
});

const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout;
