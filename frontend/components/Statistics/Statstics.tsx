import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { LineChart, BarChart, XAxis } from "react-native-svg-charts";
import { IWorkout } from '../../../backend/src/schemas/Workout';
import { useFocusEffect } from '@react-navigation/native';

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchCompletedWorkouts = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get(
            "https://trainy-app-99e3d8c3fb24.herokuapp.com/completedWorkouts",
            config
          );
          console.log("Completed Workouts Response:", response.data);
          setCompletedWorkouts(response.data.completedWorkouts);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchCompletedWorkouts();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Completed Workouts</Text>
      <Text style={styles.text}>{completedWorkouts}</Text>
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
          "https://trainy-app-99e3d8c3fb24.herokuapp.com/exerciseTypeStats",
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
        svg={{ fill: "#92b4f4" }}
        contentInset={{ top: 20, bottom: 20 }}
      />
      <XAxis
        style={{ marginHorizontal: -10, marginTop: 10 }}
        data={exerciseLabels}
        formatLabel={(value, index) => exerciseLabels[index]}
        contentInset={{ left: 15, right: 15 }}
        svg={{ fontSize: 10 }}
      />
    </View>
  );
}

function AverageWorkoutDuration() {
  const [averageDuration, setAverageDuration] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAverageWorkoutDuration = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get(
            "https://trainy-app-99e3d8c3fb24.herokuapp.com/averageWorkoutDuration",
            config
          );
          setAverageDuration(response.data.averageDuration);
          console.log(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchAverageWorkoutDuration();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Average Workout Duration</Text>
      <Text style={styles.text}>{averageDuration} mins</Text>
    </View>
  );
}

function LongestShortestWorkout() {
  const [longestWorkout, setLongestWorkout] = useState(0);
  const [shortestWorkout, setShortestWorkout] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLongestAndShortestWorkout = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get(
            "https://trainy-app-99e3d8c3fb24.herokuapp.com/workoutLengthStats",
            config
          );
          setLongestWorkout(response.data.longest);
          setShortestWorkout(response.data.shortest);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchLongestAndShortestWorkout();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Longest Workout</Text>
      <Text style={styles.text}>{longestWorkout} mins</Text>
      <Text style={styles.title}>Shortest Workout</Text>
      <Text style={styles.text}>{shortestWorkout} mins</Text>
    </View>
  );
}

function MostCommonExercise() {
  const [mostCommonExercise, setMostCommonExercise] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchMostCommonExercise = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get(
            "https://trainy-app-99e3d8c3fb24.herokuapp.com/mostCommonExercise",
            config
          );
          console.log(response.data);
          setMostCommonExercise(response.data.mostCommonExercise);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchMostCommonExercise();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Most Common Exercise</Text>
      <Text style={styles.text}>{mostCommonExercise}</Text>
    </View>
  );
}

// Average Sets and Reps Component
function AverageSetsAndReps() {
  const [averageData, setAverageData] = useState<AverageDataStructure>({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get(
            "https://trainy-app-99e3d8c3fb24.herokuapp.com/statistics/average-sets-reps",
            config
          );
          console.log("Average Sets and Reps Response:", response.data);
          setAverageData(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchData();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Average Sets and Reps per Exercise</Text>
      {Object.keys(averageData).map((exercise) => (
        <Text key={exercise} style={styles.text}>
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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get(
            "https://trainy-app-99e3d8c3fb24.herokuapp.com/statistics/workout-streak",
            config
          );
          console.log("Workout Streak Response:", response.data);
          setStreak(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchData();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Workout Streak</Text>
      <Text style={styles.text}>Current Streak: {streak} days</Text>
    </View>
  );
}

function RecentCompletedWorkouts() {
  const [recentWorkouts, setRecentWorkouts] = useState<IWorkout[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecentCompletedWorkouts = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get("https://trainy-app-99e3d8c3fb24.herokuapp.com/statistics/recent-completed-workouts", config);
          setRecentWorkouts(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchRecentCompletedWorkouts();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Workouts</Text>
      {recentWorkouts.map(workout => (
        <Text key={workout._id} style={styles.text}>{workout.name}</Text>
      ))}
    </View>
  );
}


function MostUsedExercise() {
  const [exercise, setExercise] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchMostUsedExercise = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get("https://trainy-app-99e3d8c3fb24.herokuapp.com/statistics/most-used-exercise", config);
          setExercise(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchMostUsedExercise();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Most Used Exercise</Text>
      <Text style={styles.text}>{exercise}</Text>
    </View>
  );
}


function TotalWeightLifted() {
  const [totalWeight, setTotalWeight] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTotalWeightLifted = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get("https://trainy-app-99e3d8c3fb24.herokuapp.com/statistics/total-weight-lifted", config);
          setTotalWeight(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchTotalWeightLifted();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total Weight Lifted</Text>
      <Text style={styles.text}>{totalWeight} kg/lbs</Text>
    </View>
  );
}


function MostCommonMuscleGroup() {
  const [mostCommonGroup, setMostCommonGroup] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchMostCommonMuscleGroup = async () => {
        try {
          const config = await getAxiosConfig();
          const response = await axios.get("https://trainy-app-99e3d8c3fb24.herokuapp.com/statistics/most-common-muscle-group", config);
          setMostCommonGroup(response.data);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      };

      fetchMostCommonMuscleGroup();

      // Cleanup function if needed
      return () => {};
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Most Common Muscle Group</Text>
      <Text style={styles.text}>{mostCommonGroup}</Text>
    </View>
  );
}

// Main Statistics Component

//sprobaj zadnji dve
function WorkoutStatistics() {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <CompletedWorkouts />
      <AverageWorkoutDuration />
      <AverageSetsAndReps />
      <MostCommonExercise />
      <RecentCompletedWorkouts />
      <TotalWeightLifted />
      <WorkoutStreak />
      <MostUsedExercise />
      <MostCommonMuscleGroup />
      <LongestShortestWorkout /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2d3d',
    padding: 16,
    paddingBottom: 32,  // Add this line
  },
  card: {
    padding: 20,
    backgroundColor: '#4e937a',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    color: '#e5f4e3',
    marginBottom: 8,
    fontWeight: "bold"
  },
  text: {
    fontSize: 18,
    color: '#e5f4e3',
    marginBottom: 8,
  },
  value: {
    fontSize: 48,
    color: '#e5f4e3',
  },
  axis: {
    fontSize: 10,
    fill: '#e5f4e3'
  }
});


export default WorkoutStatistics;