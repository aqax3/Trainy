import { Document, Schema, model } from "mongoose";

export interface IExercise extends Document {
  name: string;
  description: string;
  type: string;
  videoURL: string;
}

const exerciseSchema: Schema<IExercise> = new Schema({
  name: String,
  description: String,
  type: String,
  videoURL: String,
});

const Exercise = model<IExercise>('Exercise', exerciseSchema);

export default Exercise;