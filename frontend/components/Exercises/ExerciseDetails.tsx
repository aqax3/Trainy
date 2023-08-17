import React, { useState } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";

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
    <View style={styles.rootContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="ios-arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Exercise Details</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{exercise.name}</Text>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={exercise.videoURL}
          />
          <Text style={styles.description}>{exercise.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#1a2d3d',
  },
  scrollView: {
    backgroundColor: '#1a2d3d',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a2d3d",
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#e5f4e3",
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#1a2d3d",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e5f4e3",
  },
  description: {
    marginTop: 10,
    color: "#e5f4e3",
    textAlign: "center",
    fontWeight: "bold",
  },
  icon: {
    color: "#92b4f4",
  },
});
