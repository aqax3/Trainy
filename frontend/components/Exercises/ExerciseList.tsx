import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useEffect } from "react";

import axios from "axios";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";

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
  ExerciseDetails: { exerciseId: string };
  WorkoutDetailScreen: { workoutId: string };
};

export default function ExerciseList() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("arms");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  const navigation =
    useNavigation<StackNavigationProp<StackParamList, "ExerciseList">>();

  // Function to fetch all exercises
  const getAllExercises = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`http://localhost:5001/exercises`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // run function to get all exercises
  useEffect(() => {
    getAllExercises();
  }, []);

  // When muscle group dropdown is changed or exercises state updates,
  // update filteredExercises to show exercises of selected muscle group
  useEffect(() => {
    if (selectedMuscleGroup) {
      const filtered = exercises.filter(
        (exercise) => exercise.muscleGroup === selectedMuscleGroup
      );
      setFilteredExercises(filtered);
    } else {
      setFilteredExercises(exercises);
    }
  }, [selectedMuscleGroup, exercises]);

  // When the search query is changed,
  // filter exercises based on the text and set them to filteredExercises
  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = exercises.filter((exercise) => {
      if (selectedMuscleGroup && exercise.muscleGroup !== selectedMuscleGroup) {
        return false;
      }
      return exercise.name.toLowerCase().includes(query);
    });

    setFilteredExercises(filtered);
  }, [searchQuery]);

  //loading indicator for exercises
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", padding: 20 }}>
      {
        //SEARCH BAR
      }
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for exercises..."
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "#e0e0e0",
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      {
        //DROP DOWN MENU
      }
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
        {filteredExercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ExerciseDetails", {
                exerciseId: exercise._id,
              })
            }
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
