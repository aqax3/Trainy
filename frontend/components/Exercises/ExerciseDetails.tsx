import React, { useState } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscleGroup: "chest" | "back" | "arms" | "abdominals" | "legs" | "shoulders";
  videoURL: string;
  imageURL: string;
}

type RouteParams = {
  ExerciseDetails: {
    exerciseId: string;
  };
};

export default function ExerciseDetails() {
  const route = useRoute<RouteProp<RouteParams, "ExerciseDetails">>();
  const { exerciseId } = route.params;

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      console.log("Focused on CalendarScreen");
     
    }, [navigation]) // Add 'navigation' to the dependency array
  );

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          `http://localhost:5001/exercises-id/${exerciseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setExercise(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchExerciseDetail();
  }, [exerciseId]);

  if (isLoading || !exercise) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity> 
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>
          Exercise Details
        </Text>
      </View>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
            {exercise.name}
          </Text>
          <YoutubePlayer height={200} play={false} videoId={exercise.videoURL} />
          <Text style={{ marginTop: 10 }}>{exercise.description}</Text>
        </View>
      </ScrollView>
    </>
  );
}
