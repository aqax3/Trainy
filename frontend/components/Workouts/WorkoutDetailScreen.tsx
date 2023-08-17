import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
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
  HomeDrawer: {
    screen: string;
    params?: {
      screen: string;
      params?: {
        exerciseId: string;
      };
    };
  };
};

type Exercise = {
  exerciseId: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  imageURL?: string;
};

type WorkoutDetail = {
  name: string;
  description: string;
  difficulty?: string;
  exercises: Exercise[];
};

const WorkoutDetailScreen = ({ route }) => {
  const [workoutDetail, setWorkoutDetail] = useState<WorkoutDetail | null>(
    null
  );

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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkoutDetail();
  }, [route.params.workoutId]);

  console.log(workoutDetail);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1a2d3d", padding: 20 }}>
      <View
        style={{ backgroundColor: "#2e4b61", padding: 10, borderRadius: 5 }}
      >
        <Text
          style={{
            color: "#e5f4e3",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {workoutDetail?.name}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#2e4b61",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#e5f4e3", fontSize: 18, fontStyle: "italic" }}>
          {workoutDetail?.description}
        </Text>
      </View>

      {workoutDetail?.difficulty ? (
        <View
          style={{
            backgroundColor: "#2e4b61",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#e5f4e3" }}>
            Difficulty: {workoutDetail.difficulty}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          backgroundColor: "#2e4b61",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#e5f4e3" }}>Exercises:</Text>
      </View>

      {workoutDetail?.exercises?.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate("HomeDrawer", {
              screen: "Exercises",
              params: {
                screen: "ExerciseDetails",
                params: {
                  exerciseId: exercise.exerciseId,
                },
              },
            });
          }}
          style={{
            backgroundColor: "#2e4b61",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          {exercise.imageURL ? (
            <Image
              source={{ uri: exercise.imageURL }}
              style={{
                width: "100%",
                height: 150, 
                borderRadius: 5,
                marginBottom: 10,
              }}
              resizeMode="cover"
            />
          ) : null}
          <Text style={{ color: "#e5f4e3", fontWeight: "bold" }}>
            {exercise.name}
          </Text>
          <Text style={{ color: "#e5f4e3", marginTop: 5 }}>
            Sets: {exercise.sets}
          </Text>
          <Text style={{ color: "#e5f4e3", marginTop: 5 }}>
            Reps: {exercise.reps}
          </Text>
          {exercise.weight ? (
            <Text style={{ color: "#e5f4e3", marginTop: 5 }}>
              Weight: {exercise.weight}
            </Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default WorkoutDetailScreen;
