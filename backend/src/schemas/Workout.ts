import { Document, Schema, model, Types } from "mongoose";

export interface IWorkout extends Document {
  userId: string;
  name: string,
  description: string,
  duration: number,
  difficulty: string,
  exercises: Types.ObjectId[]; 
}

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
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
});

const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout;