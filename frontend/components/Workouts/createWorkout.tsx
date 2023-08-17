import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  FlatList,
  TouchableOpacity, StyleSheet, ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

// Define the structure of an Exercise
interface Exercise {
  _id: string;
  name: string;
  imageURL: string;
  weight: boolean;
}

// Define the structure of ExerciseDetail which extends Exercise
interface ExerciseDetail {
  exerciseId: string;
  name: string;
  imageURL: string;
  sets: string;
  reps: string;
  weight: boolean;  // Add this
  weightValue?: string;
}

const CreateWorkoutScreen = () => {
  // State variables for the component
  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetail[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [addedExercises, setAddedExercises] = useState<Exercise[]>([]);
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  // Function to add a selected exercise to the list
  const addExercise = () => {
    if (selectedExercise) {
      const detail: ExerciseDetail = {
        exerciseId: selectedExercise._id,
        name: selectedExercise.name,
        imageURL: selectedExercise.imageURL,
        sets,
        reps,
        weight: selectedExercise.weight, // Add this
        weightValue: selectedExercise.weight ? weight : undefined,
      };
      setExerciseDetails((prev) => [...prev, detail]);
      setSelectedExercise(null);
      setWeight("");
      setSets("");
      setReps("");
    }
  };

  // Function to submit the workout to the backend
  const submitWorkout = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      // Transform the exerciseDetails array
      const exercisesToSend = exerciseDetails.map((exercise) => ({
        exerciseId: exercise.exerciseId, 
        name: exercise.name,
        imageURL: exercise.imageURL,
        sets: parseInt(exercise.sets),
        reps: parseInt(exercise.reps),
        weight: exercise.weightValue ? parseInt(exercise.weightValue) : 0,
      }));

      console.log("Sending these exercises:", exercisesToSend);

      const response = await axios.post(
        "http://192.168.1.106:5001/workouts",
        {
          userId,
          name: workoutName,
          description,
          duration,
          exercises: exercisesToSend,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      Alert.alert("Workout Created Successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to Create Workout.");
    }
  };

  // Function to search for exercises based on a query
  const searchExercises = async (name: string) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      const response = await axios.get(`http://192.168.1.106:5001/exercise`, {
        params: {
          name: name, // Changed 'query' to 'name' for clarity
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to fetch exercises.");
    }
  };

  // Function to handle the selection of an exercise
  const onExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  // useEffect to handle the search functionality with a debounce
  useEffect(() => {
    // Add a debounce to prevent making too many requests in quick succession
    const debounceSearch = setTimeout(() => {
      if (searchInput) {
        searchExercises(searchInput);
      } else {
        setSearchResults([]); // Clear results if input is empty
      }
    }, 300); // 300ms debounce

    // Cleanup function to clear the timeout when the component is unmounted or before running the effect again
    return () => {
      clearTimeout(debounceSearch);
    };
  }, [searchInput]);

  // Render the component
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 120}}>
      <Text style={styles.label}>Workout Name</Text>
      <TextInput style={styles.input} placeholder="Workout Name" placeholderTextColor={"#92b4f4"} value={workoutName} onChangeText={(text) => setWorkoutName(text)} />
  
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} placeholder="Description" placeholderTextColor={"#92b4f4"} value={description} onChangeText={(text) => setDescription(text)} />

      <Text style={styles.label}>Duration in minutes</Text>
      <TextInput style={styles.input} placeholder="Duration" placeholderTextColor={"#92b4f4"} value={duration} onChangeText={setDuration} keyboardType="numeric" />
  
      <Text style={styles.label}>Exercises</Text>
      <TextInput style={styles.input} placeholder="Search Exercises" placeholderTextColor={"#92b4f4"} value={searchInput} onChangeText={setSearchInput} />
  
      {/* List of search results */}
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Button title="Select" onPress={() => onExerciseSelect(item)} color={"#e5f4e3"}/>
          </View>
        )}
      />
  
      {selectedExercise && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.exerciseName}>{selectedExercise.name}</Text>
          {selectedExercise.weight && (
            <TextInput style={styles.input} placeholder="Weight" placeholderTextColor={"#92b4f4"} value={weight} onChangeText={setWeight} keyboardType="numeric" />
          )}
          <TextInput style={styles.input} placeholder="Sets" placeholderTextColor={"#92b4f4"} value={sets} onChangeText={setSets} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Reps" placeholderTextColor={"#92b4f4"} value={reps} onChangeText={setReps} keyboardType="numeric" />
          <Button title="Add Exercise" onPress={addExercise} color={"#4e937a"} />
        </View>
      )}

      <FlatList
        data={exerciseDetails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10, }}>
            <Text style={styles.label}>Selected Exercises</Text>
            <Text style={{color: "#e5f4e3"}}>{item.name}</Text>
            {item.weight && <Text style={{color: "#e5f4e3"}}>Weight: {item.weightValue}</Text>}
            <Text style={{color: "#e5f4e3"}}>Sets: {item.sets}</Text>
            <Text style={{color: "#e5f4e3"}}>Reps: {item.reps}</Text>
          </View>
        )}
      />

      <Button title="Submit Workout" onPress={submitWorkout} color={"#4e937a"}/>
    </ScrollView>
  );
};

export default CreateWorkoutScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1a2d3d",
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#e5f4e3',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5f4e3",
    backgroundColor: '#4e937a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4e937a",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  exerciseName: {
    color: "#e5f4e3",
    fontSize: 16,
    marginBottom: 8,
  },
});