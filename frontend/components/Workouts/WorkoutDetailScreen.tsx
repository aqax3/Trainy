import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  ExerciseDetails: {
    exerciseId: string;
  };
  WorkoutDetailScreen: {
    workoutId: string;
  };
};

type Exercise = {
  exerciseId: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number; // weight is optional
  // ... any other properties
};

type WorkoutDetail = {
  name: string;
  description: string;
  difficulty?: string;
  exercises: Exercise[];
};

const WorkoutDetailScreen = ({ route }) => {
  const [workoutDetail, setWorkoutDetail] = useState<WorkoutDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          `http://192.168.1.106:5001/workouts/${route.params.workoutId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setWorkoutDetail(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchWorkoutDetail();
  }, [route.params.workoutId]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  console.log(workoutDetail);

  return (
    <View>
      <Text>{workoutDetail?.name}</Text>
      <Text>{workoutDetail?.description}</Text>

      {workoutDetail?.difficulty ? (
        <Text>Difficulty: {workoutDetail.difficulty}</Text>
      ) : null}

      {/* Display the exercises */}
      <Text>Exercises:</Text>
      {workoutDetail?.exercises?.map((exercise, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExerciseDetails", {
                exerciseId: exercise.exerciseId,
              })
            }
          >
            <Text>Name: {exercise.name}</Text>
          </TouchableOpacity>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Reps: {exercise.reps}</Text>
          {exercise.weight && <Text>Weight: {exercise.weight}</Text>}
          {/* Add other exercise properties if they exist */}
        </View>
      ))}
    </View>
  );
};

export default WorkoutDetailScreen;
