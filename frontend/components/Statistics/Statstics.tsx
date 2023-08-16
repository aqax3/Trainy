import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { LineChart, BarChart, XAxis } from "react-native-svg-charts";
import { IWorkout } from '../../../backend/src/schemas/Workout';

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ExerciseStat = {
  value: number;
  label: string;
};
type AverageDataStructure = {
  [key: string]: {
    averageSets: number;
    averageReps: number;
  };
};
const exerciseFrequency: Record<string, any> = {};
const data: Record<string, any> = {};

const averageData: AverageDataStructure = {};

// Function to set up Axios configurations with user token
const getAxiosConfig = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
};

function CompletedWorkouts() {
  const [completedWorkouts, setCompletedWorkouts] = useState(0);

  useEffect(() => {
    const fetchCompletedWorkouts = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/completedWorkouts",
          config
        );
        console.log("Completed Workouts Response:", response.data);
        setCompletedWorkouts(response.data.completedWorkouts);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchCompletedWorkouts();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Completed Workouts</Text>
      <Text style={styles.value}>{completedWorkouts}</Text>
    </View>
  );
}

function ExerciseTypeStats() {
  const [exerciseData, setExerciseData] = useState<number[]>([]);
  const [exerciseLabels, setExerciseLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchExerciseTypeStats = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/exerciseTypeStats",
          config
        );
        const dataValues = response.data.map(
          (item: { value: any }) => item.value
        );
        const dataLabels = response.data.map(
          (item: { label: any }) => item.label
        );

        setExerciseData(dataValues);
        setExerciseLabels(dataLabels);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchExerciseTypeStats();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Exercise Type Stats</Text>
      <BarChart
        style={{ height: 200, flex: 1 }}
        data={exerciseData}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        contentInset={{ top: 20, bottom: 20 }}
      />
      <XAxis
        style={{ marginHorizontal: -10, marginTop: 10 }}
        data={exerciseLabels}
        formatLabel={(value, index) => exerciseLabels[index]}
        contentInset={{ left: 15, right: 15 }}
        svg={{ fontSize: 10, fill: "black" }}
      />
    </View>
  );
}

function AverageWorkoutDuration() {
  const [averageDuration, setAverageDuration] = useState(0);

  useEffect(() => {
    const fetchAverageWorkoutDuration = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/averageWorkoutDuration",
          config
        );
        setAverageDuration(response.data.averageDuration);
        console.log(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchAverageWorkoutDuration();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Average Workout Duration</Text>
      <Text style={styles.value}>{averageDuration} mins</Text>
    </View>
  );
}

function LongestShortestWorkout() {
  const [longestWorkout, setLongestWorkout] = useState(0);
  const [shortestWorkout, setShortestWorkout] = useState(0);

  useEffect(() => {
    const fetchLongestAndShortestWorkout = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/workoutLengthStats",
          config
        );
        setLongestWorkout(response.data.longest);
        setShortestWorkout(response.data.shortest);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchLongestAndShortestWorkout();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Longest Workout</Text>
      <Text style={styles.value}>{longestWorkout} mins</Text>
      <Text style={styles.title}>Shortest Workout</Text>
      <Text style={styles.value}>{shortestWorkout} mins</Text>
    </View>
  );
}

function MostCommonExercise() {
  const [mostCommonExercise, setMostCommonExercise] = useState("");

  useEffect(() => {
    const fetchMostCommonExercise = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/mostCommonExercise",
          config
        );
        console.log(response.data);
        setMostCommonExercise(response.data.mostCommonExercise);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchMostCommonExercise();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Most Common Exercise</Text>
      <Text style={styles.value}>{mostCommonExercise}</Text>
    </View>
  );
}

// Average Sets and Reps Component
function AverageSetsAndReps() {
  const [averageData, setAverageData] = useState<AverageDataStructure>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/statistics/average-sets-reps",
          config
        );
        console.log("Average Sets and Reps Response:", response.data);
        setAverageData(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Average Sets and Reps</Text>
      {Object.keys(averageData).map((exercise) => (
        <Text key={exercise}>
          {exercise}: {averageData[exercise].averageSets} sets,{" "}
          {averageData[exercise].averageReps} reps
        </Text>
      ))}
    </View>
  );
}
// Workout Streak Component
function WorkoutStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get(
          "http://192.168.1.106:5001/statistics/workout-streak",
          config
        );
        console.log("Workout Streak Response:", response.data);
        setStreak(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Workout Streak</Text>
      <Text>Current Streak: {streak} days</Text>
    </View>
  );
}

function RecentCompletedWorkouts() {
  const [recentWorkouts, setRecentWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    const fetchRecentCompletedWorkouts = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get("http://192.168.1.106:5001/statistics/recent-completed-workouts", config);
        setRecentWorkouts(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchRecentCompletedWorkouts();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Workouts</Text>
      {recentWorkouts.map(workout => (
        <Text key={workout._id}>{workout.name}</Text>
      ))}
    </View>
  );
}
function MostUsedExercise() {
  const [exercise, setExercise] = useState("");

  useEffect(() => {
    const fetchMostUsedExercise = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get("http://192.168.1.106:5001/statistics/most-used-exercise", config);
        setExercise(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchMostUsedExercise();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Most Used Exercise</Text>
      <Text style={styles.value}>{exercise}</Text>
    </View>
  );
}
function TotalWeightLifted() {
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const fetchTotalWeightLifted = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get("http://192.168.1.106:5001/statistics/total-weight-lifted", config);
        setTotalWeight(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchTotalWeightLifted();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total Weight Lifted</Text>
      <Text style={styles.value}>{totalWeight} kg/lbs</Text>
    </View>
  );
}
function MostCommonMuscleGroup() {
  const [mostCommonGroup, setMostCommonGroup] = useState("");

  useEffect(() => {
    const fetchMostCommonMuscleGroup = async () => {
      try {
        const config = await getAxiosConfig();
        const response = await axios.get("http://192.168.1.106:5001/statistics/most-common-muscle-group", config);
        setMostCommonGroup(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchMostCommonMuscleGroup();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Most Common Muscle Group</Text>
      <Text style={styles.value}>{mostCommonGroup}</Text>
    </View>
  );
}

// Main Statistics Component
function WorkoutStatistics() {
  return (
    <ScrollView style={styles.container}>
      <CompletedWorkouts />
      <AverageWorkoutDuration />
      <AverageSetsAndReps />
      <MostCommonExercise />
      <RecentCompletedWorkouts />
      <TotalWeightLifted />
      <WorkoutStreak />
      <MostUsedExercise />
      <MostCommonMuscleGroup />
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
  },
  value: {
    fontSize: 48,
  },
};

export default WorkoutStatistics;
