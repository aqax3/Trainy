import WorkoutCalendar, { IWorkoutCalendar } from "../schemas/Workoutcalendar";
import { Document, Schema } from "mongoose";
import { IExercise } from "../schemas/Exercise";
import Workout, { IWorkout } from "../schemas/Workout";


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
//  Average Workout Duration
export async function getAverageWorkoutDuration(userId: string) {
    const workouts = await Workout.find({userId: userId});
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    return workouts.length ? totalDuration / workouts.length : 0;
}

//  Longest/Shortest Workout
export async function getLongestAndShortestWorkout(userId: string) {
    const workouts = await Workout.find({userId: userId});
    if (workouts.length === 0) return { longest: null, shortest: null };

    let longest = workouts[0];
    let shortest = workouts[0];
    
    workouts.forEach(workout => {
        if (workout.duration > longest.duration) longest = workout;
        if (workout.duration < shortest.duration) shortest = workout;
    });

    return { longest, shortest };
}

// Most Common Exercise
export async function getMostCommonExercise(userId: string) {
    const workoutCalendars = await WorkoutCalendar.find({ user: userId })
        .populate({
            path: 'workout',
            populate: {
                path: 'exercises'
            }
        })
        .exec();

    const typeCounts: { [key: string]: number } = {};

    workoutCalendars.forEach((workoutCalendar: IWorkoutCalendar) => {
        const workout: IWorkout = workoutCalendar.workout as unknown as IWorkout;
        if(workout.exercises){
            (workout.exercises as unknown as IExercise[]).forEach((exercise: IExercise) => {
                if (typeCounts[exercise.type] !== undefined) {
                    typeCounts[exercise.type]++;
                } else {
                    typeCounts[exercise.type] = 1;
                }
            });
        }
    });

    let maxCount = 0;
    let mostCommonExercise = null;

    for (let exerciseType in typeCounts) {
        if (typeCounts[exerciseType] > maxCount) {
            maxCount = typeCounts[exerciseType];
            mostCommonExercise = exerciseType;
        }
    }

    return mostCommonExercise;
}


// Workouts Per Week/Month
export async function getWorkoutFrequency(userId: string, period: 'week' | 'month') {
    const now = new Date();
    const past = new Date();

    if (period === 'week') {
        past.setDate(now.getDate() - 7);
    } else if (period === 'month') {
        past.setMonth(now.getMonth() - 1);
    } else {
        throw new Error(`Invalid period: ${period}. Expected 'week' or 'month'.`);
    }

    const workouts = await WorkoutCalendar.find({ 
        user: userId, 
        date: { $gte: past, $lte: now } 
    }).exec();

    return workouts.length;
}

