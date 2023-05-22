import { Document, Schema, model } from "mongoose";

interface IExercise extends Document {
  name: string;
  description: string;
  type: string;
}

const exerciseSchema: Schema<IExercise> = new Schema({
  name: String,
  description: String,
  type: String,
});

const Exercise = model<IExercise>('Exercise', exerciseSchema);

export default Exercise;