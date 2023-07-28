import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useEffect } from "react";

import axios from "axios";
import { ActivityIndicator, Text } from "react-native";
import { Card } from "@rneui/base";
import { ScrollView } from "react-native";

import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";

interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscleGroup: "chest" | "back" | "arms" | "abdominals" | "legs" | "shoulders";
  videoURL: string;
}

export default function ExerciseList() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("arms");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getExerciseByMuscleGroup(selectedMuscleGroup);
  }, [selectedMuscleGroup]);

  const getExerciseByMuscleGroup = async (muscleGroup: string) => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `http://192.168.1.104:5001/exercises/muscle-group/${muscleGroup}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedMuscleGroup(value)}
        items={[
          { label: "CHEST", value: "chest" },
          { label: "BACK", value: "back" },
          { label: "ARMS", value: "arms" },
          { label: "LEGS", value: "legs" },
          { label: "SHOULDERS", value: "shoulders" },
          { label: "ABDOMINALS", value: "abdominals" },
        ]}
        style={{
          // Here you can apply your custom styles
          inputIOS: {
            color: "black",
            paddingTop: 13,
            paddingHorizontal: 10,
            paddingBottom: 12,
          },
          inputAndroid: {
            color: "black",
          },
        }}
        value={selectedMuscleGroup}
        placeholder={{ label: "Select a muscle group", value: null }}
      />

      <ScrollView>
        {exercises.map((exercise, index) => (
          <Card key={index}>
            <Card.Title>{exercise.name}</Card.Title>
            <Card.Divider />
            <YoutubePlayer
              height={200}
              play={false}
              videoId={exercise.videoURL}
            />
            <Text style={{ marginBottom: 10, marginTop: 10 }}>
              {exercise.description}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
