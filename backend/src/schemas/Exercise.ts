import { Document, Schema, model } from "mongoose";

export interface IExercise extends Document {
  name: string;
  description: string;
  muscleGroup: string;
  videoURL: string;
  imageURL: string;
}

const exerciseSchema: Schema<IExercise> = new Schema({
  name: String,
  description: String,
  muscleGroup: {
    type: String,
    enum: ['chest', 'back', 'arms', 'abdominals', 'legs', 'shoulders'],
    required: true
  },
  videoURL: String,
  imageURL: String
});

const Exercise = model<IExercise>('Exercise', exerciseSchema);

export default Exercise;