import { Document, Schema, model, Types } from "mongoose";

interface IWorkout extends Document {
  userId: string;
  name: string,
  description: string,
  duration: number,
  exercises: Types.ObjectId[]; 
}

const workoutSchema: Schema<IWorkout> = new Schema({
  userId: String,
  name: String,
  description: String,
  duration: Number,
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
});

const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout;