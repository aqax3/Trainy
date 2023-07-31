import mongoose from "mongoose";
import WorkoutCalendar from "../schemas/Workoutcalendar";
import { IWorkout } from "../schemas/Workout";
import Workout from "../schemas/Workout";

interface IWorkoutCalendar {
  user: mongoose.Schema.Types.ObjectId;
  date: Date;
  workout: IWorkout;
}

export async function getUserWorkoutHistory(userId: string, startDate: Date) {
  return await WorkoutCalendar.find({
    user: userId,
    completed: true,
    createdAt: { $gte: startDate },
  })
    .populate("workout")
    .exec();
}

export async function getWorkoutRecommendation(userId: string) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const userWorkouts = (await getUserWorkoutHistory(
    userId,
    oneMonthAgo
  )) as IWorkoutCalendar[];

  let difficultyCounts: { [key: string]: number } = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  userWorkouts.forEach((workoutCalendar) => {
    const difficulty = workoutCalendar.workout.difficulty;

    if (difficultyCounts[difficulty] !== undefined) {
      difficultyCounts[difficulty]++;
    }
  });

  let mostFrequentDifficulty = Object.keys(difficultyCounts).reduce((a, b) =>
    difficultyCounts[a] > difficultyCounts[b] ? a : b
  );

  let recommendedDifficulty;
  if (
    mostFrequentDifficulty === "beginner" &&
    difficultyCounts["beginner"] >= 20
  ) {
    recommendedDifficulty = "intermediate";
  } else if (
    mostFrequentDifficulty === "intermediate" &&
    difficultyCounts["intermediate"] >= 20
  ) {
    recommendedDifficulty = "advanced";
  }  else {
    recommendedDifficulty = mostFrequentDifficulty;
  }

  return {
    recommendedDifficulty: recommendedDifficulty,
  };
}
