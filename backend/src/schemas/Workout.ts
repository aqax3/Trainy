import { Document, Schema, model, Types } from "mongoose";

interface IWorkout extends Document {
  userId: string;
  date: Date;
  exercises: Types.ObjectId[]; // references Exercise documents
}

const workoutSchema: Schema<IWorkout> = new Schema({
  userId: String,
  date: Date,
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
});

const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout;