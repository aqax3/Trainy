import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useEffect } from "react";

import axios from "axios";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Animated } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

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
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(
    null
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  const navigation =
    useNavigation<StackNavigationProp<StackParamList, "ExerciseList">>();

  const scrollY = new Animated.Value(0);
  const gradientOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Function to fetch all exercises
  const getAllExercises = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`http://192.168.1.106:5001/exercises`, {
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
    <View style={styles.container}>
      {
        //SEARCH BAR
      }
      <View style={styles.pickerSearchContainer}>
        <View style={styles.pickerInnerContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for exercises..."
            placeholderTextColor="#e5f4e3"
            style={styles.input}
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
              viewContainer: styles.pickerContainer,
              inputIOS: styles.pickerInputIOS,
              inputAndroid: styles.pickerInputAndroid,
            }}
            value={selectedMuscleGroup}
            placeholder={{ label: "Select a muscle group", value: null }}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 75, marginBottom: 0 }}
      >
        {filteredExercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ExerciseDetails", {
                exerciseId: exercise._id,
              })
            }
          >
            <Card key={index} containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{exercise.name}</Card.Title>
              {isLoadingImage && (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
              <Image
                source={{ uri: exercise.imageURL }}
                style={styles.image}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a2d3d",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#4e937a",
    borderRadius: 10,
    marginBottom: 10,
    color: "#e5f4e3",
    backgroundColor: "#4e937a",
  },
  searchBar: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 15,
    color: "#e5f4e3",
    backgroundColor: "#4e937a",
  },
  pickerSearchContainer: {
  },
  pickerInnerContainer: {
  },
  pickerContainer: {
    borderWidth: 3,
    borderColor: "#4e937a",
    borderRadius: 10,
  },
  pickerInputAndroid: {
    color: "#e5f4e3",
    backgroundColor: "#4e937a",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center'
  },
  pickerInputIOS: {
    color: "#e5f4e3",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 13,
    textAlign: 'center'
  },
  card: {
    backgroundColor: "#1a2d3d",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#92b4f4",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // this is needed for Android
  },
  cardTitle: {
    color: "#e5f4e3",
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 10,
    borderRadius: 15,
  },
});
