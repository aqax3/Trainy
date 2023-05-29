import WorkoutCalendar from "../schemas/Workoutcalendar";
import { Document, Schema } from "mongoose";
import { IExercise } from "../schemas/Exercise";


interface IWorkoutCalendarPopulated extends Document {
    user: Schema.Types.ObjectId,
    date: Date,
    workout: IWorkoutPopulated
  }
  
  interface IWorkoutPopulated extends Document {
    userId: string;
    name: string,
    description: string,
    duration: number,
    difficulty: string,
    exercises: IExercise[]; 
  }

export async function getCompletedWorkouts(userId: string) {
    const workouts = await WorkoutCalendar.find({user: userId});
    return workouts.length;
}

export async function getExerciseTypeStats(userId: string) {
    const workoutCalendars = await WorkoutCalendar.find({ user: userId })
        .populate({
            path: 'workout',
            populate: {
                path: 'exercises'
            }
        })
        .exec();

    const typeCounts: { [key: string]: number } = {};

    workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
        const workout = workoutCalendar.workout;
        workout.exercises.forEach((exercise: IExercise) => {
            if (typeCounts[exercise.type] !== undefined) {
                typeCounts[exercise.type]++;
            } else {
                typeCounts[exercise.type] = 1;
            }
        });
    });

    return typeCounts;
}