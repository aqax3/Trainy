import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useEffect } from "react";

import axios from "axios";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscleGroup: "chest" | "back" | "arms" | "abdominals" | "legs" | "shoulders";
  videoURL: string;
  imageURL: string;
}

type StackParamList = {
  ExerciseList: undefined;
  ExerciseDetails: { exercise: Exercise };
};

export default function ExerciseList() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("arms");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const navigation =
    useNavigation<StackNavigationProp<StackParamList, "ExerciseList">>();

  useEffect(() => {
    getExerciseByMuscleGroup(selectedMuscleGroup);
  }, [selectedMuscleGroup]);

  const getExerciseByMuscleGroup = async (muscleGroup: string) => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `http://192.168.1.106:5001/exercises/muscle-group/${muscleGroup}`,
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
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("ExerciseDetails", { exercise })}
          >
            <Card key={index}>
              <Card.Title>{exercise.name}</Card.Title>
              <Card.Divider />
              {isLoadingImage && (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
              <Image
                source={{ uri: exercise.imageURL }}
                style={{ height: 200, width: "100%" }}
                resizeMode="cover"
                onLoadStart={() => setIsLoadingImage(true)}
                onLoadEnd={() => setIsLoadingImage(false)}
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
