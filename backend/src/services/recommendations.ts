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
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set time to end of day

  return await WorkoutCalendar.find({
    user: userId,
    completed: true,
    date: { $gte: startDate, $lte: today }, // both after startDate and on or before today
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

  console.log(userWorkouts.length);

  if (userWorkouts.length === 0) {
    return {
      recommendedDifficulty: "none",
    };
  }

  let difficultyCounts: { [key: string]: number } = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    none: 0,
  };

  userWorkouts.forEach((workoutCalendar) => {
    const difficulty = workoutCalendar.workout ? workoutCalendar.workout.difficulty || "none" : "none";
    difficultyCounts[difficulty]++;
  });
  

  // Remove the none difficulty from consideration for mostFrequent
  const { none, ...validDifficulties } = difficultyCounts;

  let mostFrequentDifficulty = Object.keys(validDifficulties).reduce((a, b) =>
    validDifficulties[a] > validDifficulties[b] ? a : b
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
  } else if (
    none >= userWorkouts.length / 2 ||
    (mostFrequentDifficulty !== "advanced" &&
      difficultyCounts[mostFrequentDifficulty] < 20)
  ) {
    recommendedDifficulty = "none";
  } else {
    recommendedDifficulty = mostFrequentDifficulty;
  }

  console.log(recommendedDifficulty);
  return {
    recommendedDifficulty: recommendedDifficulty,
  };
}
