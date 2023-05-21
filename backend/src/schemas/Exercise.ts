import { Document, Schema, model } from "mongoose";

interface IExercise extends Document {
  name: string;
  description: string;
  type: string; // e.g. cardio, strength, flexibility
  // add any other properties you need
}

const exerciseSchema: Schema<IExercise> = new Schema({
  name: String,
  description: String,
  type: String,
  // define any other properties you need
});

const Exercise = model<IExercise>('Exercise', exerciseSchema);

export default Exercise;