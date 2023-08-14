import WorkoutCalendar, { IWorkoutCalendar } from "../schemas/Workoutcalendar";
import { Document, Schema } from "mongoose";
import { IExercise } from "../schemas/Exercise";
import Workout, { IWorkout} from "../schemas/Workout";
import { IExerciseDetails } from '../schemas/Workout';

interface IWorkoutCalendarPopulated extends Document {
  user: Schema.Types.ObjectId;
  date: Date;
  workout: IWorkoutPopulated;
  completed: boolean;
}

interface IWorkoutPopulated extends Document {
  userId: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  exercises: IExercise[];
}


export async function getCompletedWorkouts(userId: string) {
  const workouts = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  });
  return workouts.length;
}

export async function getExerciseTypeStats(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
    .populate({
      path: "workout",
      populate: {
        path: "exercises",
      },
    })
    .exec();

  const muscleGroupCounts: { [key: string]: number } = {};

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    const workout = workoutCalendar.workout;
    workout.exercises.forEach((exercise: IExercise) => {
      if (muscleGroupCounts[exercise.muscleGroup] !== undefined) {
        muscleGroupCounts[exercise.muscleGroup]++;
      } else {
        muscleGroupCounts[exercise.muscleGroup] = 1;
      }
    });
  });

  // Convert the muscleGroupCounts object to an array of objects
  const result = Object.entries(muscleGroupCounts).map(([label, value]) => ({
    label,
    value,
  }));

  return result;
}


//  Average Workout Duration
export async function getAverageWorkoutDuration(userId: string) {
  console.log("Fetching completed workout calendars for user:", userId);

  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
    .populate("workout")
    .exec();

  console.log("Fetched workout calendars:", workoutCalendars);

  let totalDuration = 0;
  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    totalDuration += workoutCalendar.workout.duration;
  });

  console.log("Total duration of all workouts:", totalDuration);

  if (workoutCalendars.length) {
    const averageDuration = totalDuration / workoutCalendars.length;
    console.log("Calculated average duration:", averageDuration);
    return averageDuration;
  } else {
    console.log("No completed workouts found for user.");
    return 0;
  }
}

//  Longest/Shortest Workout
export async function getLongestAndShortestWorkout(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
    .populate("workout")
    .exec();

  if (workoutCalendars.length === 0) return { longest: null, shortest: null };

  let longest = workoutCalendars[0].workout.duration;
  let shortest = workoutCalendars[0].workout.duration;

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    if (workoutCalendar.workout.duration > longest)
      longest = workoutCalendar.workout.duration;
    if (workoutCalendar.workout.duration < shortest)
      shortest = workoutCalendar.workout.duration;
  });

  return { longest, shortest };
}

// Most Common Exercise
export async function getMostCommonExercise(userId: string) {
  console.log("Fetching completed workout calendars for user:", userId);

  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
    .populate({
      path: "workout",
      populate: {
        path: "exercises",
      },
    })
    .exec();

  console.log("Fetched workout calendars:", workoutCalendars);

  const exerciseCounts: { [key: string]: number } = {};

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    const workout: IWorkout = workoutCalendar.workout as unknown as IWorkout;
    if (workout.exercises) {
      (workout.exercises as unknown as IExercise[]).forEach(
        (exercise: IExercise) => {
          if (exerciseCounts[exercise.name] !== undefined) {
            exerciseCounts[exercise.name]++;
          } else {
            exerciseCounts[exercise.name] = 1;
          }
        }
      );
    }
  });

  console.log("Exercise counts:", exerciseCounts);

  let maxCount = 0;
  let mostCommonExerciseName = null;

  for (let exerciseName in exerciseCounts) {
    if (exerciseCounts[exerciseName] > maxCount) {
      maxCount = exerciseCounts[exerciseName];
      mostCommonExerciseName = exerciseName;
    }
  }

  console.log("Most common exercise:", mostCommonExerciseName);
  return mostCommonExerciseName;
}

// Workouts Per Week/Month
export async function getWorkoutFrequency(
  userId: string,
  period: "week" | "month"
) {
  const now = new Date();
  const past = new Date();

  if (period === "week") {
    past.setDate(now.getDate() - 7);
  } else if (period === "month") {
    past.setMonth(now.getMonth() - 1);
  } else {
    throw new Error(`Invalid period: ${period}. Expected 'week' or 'month'.`);
  }

  const workouts = await WorkoutCalendar.find({
    user: userId,
    completed: true,
    date: { $gte: past, $lte: now },
  }).exec();

  return workouts.length;
}


//workouti po difficulty

export async function getTotalWorkoutsByDifficulty(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
  .populate("workout")
  .exec();

  const difficultyCounts: { [key: string]: number } = {
    beginner: 0,
    intermediate: 0,
    advanced: 0
  };

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    const difficulty = workoutCalendar.workout.difficulty;
    difficultyCounts[difficulty]++;
  });

  return difficultyCounts;
}

//frequency for each exercise
export async function getExerciseFrequency(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
  .populate({
    path: "workout",
    populate: {
      path: "exercises"
    }
  })
  .exec();

  const exerciseCounts: { [key: string]: number } = {};

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    (workoutCalendar.workout.exercises as unknown as IExerciseDetails[]).forEach((exerciseDetail: IExerciseDetails) => {
      const exerciseName = exerciseDetail.name;
      if (exerciseCounts[exerciseName]) {
        exerciseCounts[exerciseName]++;
      } else {
        exerciseCounts[exerciseName] = 1;
      }
    });
  });

  return exerciseCounts;
}

//average sets and reps
export async function getAverageSetsAndReps(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
  .populate({
    path: "workout",
    populate: {
      path: "exercises.exerciseId"
    }
  })
  .exec();

  const exerciseData: { [key: string]: { totalSets: number, totalReps: number, count: number } } = {};

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    (workoutCalendar.workout.exercises as unknown as IExerciseDetails[]).forEach((exerciseDetail: IExerciseDetails) => {
      const exerciseName = exerciseDetail.name;
      if (exerciseData[exerciseName]) {
        exerciseData[exerciseName].totalSets += exerciseDetail.sets;
        exerciseData[exerciseName].totalReps += exerciseDetail.reps;
        exerciseData[exerciseName].count++;
      } else {
        exerciseData[exerciseName] = {
          totalSets: exerciseDetail.sets,
          totalReps: exerciseDetail.reps,
          count: 1
        };
      }
    });
  });

  const averageData: { [key: string]: { averageSets: number, averageReps: number } } = {};
  
  for (let exerciseName in exerciseData) {
    averageData[exerciseName] = {
      averageSets: exerciseData[exerciseName].totalSets / exerciseData[exerciseName].count,
      averageReps: exerciseData[exerciseName].totalReps / exerciseData[exerciseName].count
    };
  }

  return averageData;
}

//workout streak
export async function getWorkoutStreak(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({
    user: userId,
    completed: true,
  })
  .sort({ date: -1 })  // Sort by date in descending order
  .exec();

  let currentStreak = 0;
  let longestStreak = 0;
  let previousDate: Date | null = null;

  workoutCalendars.forEach((workoutCalendar: IWorkoutCalendarPopulated) => {
    const currentDate = new Date(workoutCalendar.date);
    if (previousDate) {
      const diffInDays = (previousDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
      if (diffInDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    previousDate = currentDate;
  });

  longestStreak = Math.max(longestStreak, currentStreak);  // Check if the current streak at the end was the longest

  return longestStreak;
}
//common muscle group
export async function mostCommonMuscleGroup(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({ user: userId, completed: true })
    .populate({
      path: 'workout',
      populate: {
        path: 'exercises',
        populate: {
          path: 'exerciseId'
        }
      }
    })
    .exec();

  const muscleGroupCounts: { [key: string]: number } = {};

  workoutCalendars.forEach((calendar: { workout: { exercises: { exerciseId: { muscleGroup: any; }; }[]; }; }) => {
    calendar.workout.exercises.forEach((exerciseDetail: { exerciseId: { muscleGroup: any; }; }) => {
      const muscleGroup = exerciseDetail.exerciseId.muscleGroup;
      if (muscleGroupCounts[muscleGroup]) {
        muscleGroupCounts[muscleGroup]++;
      } else {
        muscleGroupCounts[muscleGroup] = 1;
      }
    });
  });

  const mostCommonMuscleGroup = Object.keys(muscleGroupCounts).reduce((a, b) => muscleGroupCounts[a] > muscleGroupCounts[b] ? a : b);
  return mostCommonMuscleGroup;
}

//total weight
export async function totalWeightLifted(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({ user: userId, completed: true })
    .populate({
      path: 'workout',
    })
    .exec();

  let totalWeight = 0;
  workoutCalendars.forEach((calendar: { workout: { exercises: any[]; }; }) => {
    calendar.workout.exercises.forEach((exerciseDetail: { weight: number; sets: number; reps: number; }) => {
      totalWeight += exerciseDetail.weight * exerciseDetail.sets * exerciseDetail.reps;
    });
  });

  return totalWeight;
}

export async function mostUsedExercise(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({ user: userId, completed: true })
    .populate({
      path: 'workout',
    })
    .exec();

  const exerciseCounts: { [key: string]: number } = {};

  workoutCalendars.forEach((calendar: { workout: { exercises: any[]; }; }) => {
    calendar.workout.exercises.forEach((exerciseDetail) => {
      const exerciseName = exerciseDetail.name;
      if (exerciseCounts[exerciseName]) {
        exerciseCounts[exerciseName]++;
      } else {
        exerciseCounts[exerciseName] = 1;
      }
    });
  });

  const mostUsedExercise = Object.keys(exerciseCounts).reduce((a, b) => exerciseCounts[a] > exerciseCounts[b] ? a : b);
  return mostUsedExercise;
}

export async function mostRecentCompletedWorkouts(userId: string) {
  const workoutCalendars = await WorkoutCalendar.find({ user: userId, completed: true })
    .sort({ date: -1 })
    .limit(5)
    .populate('workout')
    .exec();

  return workoutCalendars.map((calendar: { workout: any; }) => calendar.workout);
}

