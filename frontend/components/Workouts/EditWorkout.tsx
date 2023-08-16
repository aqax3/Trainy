import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Button, Alert, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditWorkout = ({ route, navigation }) => {
  const workoutId = route.params.workoutId;

  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseDetails, setExerciseDetails] = useState([]);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          `http://localhost:5001/workouts/${workoutId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const workout = response.data;
        console.log(response.data);
        setWorkoutName(workout.name);
        setDescription(workout.description);
        setExerciseDetails(workout.exercises || []);
      } catch (error) {
        console.error(error);
        Alert.alert("Failed to fetch workout details.");
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Workout", // You can set a title for the screen here
      headerLeft: () => (
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const updateWorkout = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      await axios.put(
        `http://localhost:5001/workouts/${workoutId}`,
        {
          name: workoutName,
          description,
          exercises: exerciseDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      Alert.alert("Workout Updated Successfully!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to update workout.");
    }
  };

  const deleteWorkout = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      await axios.delete(`http://localhost:5001/workouts/${workoutId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      Alert.alert("Workout Deleted Successfully!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to delete workout.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <FlatList
        data={exerciseDetails}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text>{item.name}</Text>
            <TextInput
              placeholder="Sets"
              value={item.sets.toString()}
              onChangeText={(text) => {
                const updatedExercises = [...exerciseDetails];
                const index = updatedExercises.findIndex(
                  (ex) => ex._id === item._id
                );
                updatedExercises[index].sets = text ? parseInt(text) : "";
                setExerciseDetails(updatedExercises);
              }}
            />
            <TextInput
              placeholder="Reps"
              value={item.reps.toString()}
              onChangeText={(text) => {
                const updatedExercises = [...exerciseDetails];
                const index = updatedExercises.findIndex(
                  (ex) => ex._id === item._id
                );
                updatedExercises[index].reps = text ? parseInt(text) : "";
                setExerciseDetails(updatedExercises);
              }}
            />
            {item.weight ?  (
              <TextInput
                placeholder="Weight"
                value={item.weight.toString()}
                onChangeText={(text) => {
                  const updatedExercises = [...exerciseDetails];
                  const index = updatedExercises.findIndex(
                    (ex) => ex._id === item._id
                  );
                  updatedExercises[index].weight = text ? parseFloat(text) : "";
                  setExerciseDetails(updatedExercises);
                }}
              />
            ) : null }
            <Button
              title="Delete Exercise"
              onPress={() => {
                console.log("Deleting exercise with ID:", item._id);
                console.log("Exercises before deletion:", exerciseDetails);
                setExerciseDetails((prev) => {
                  const updatedExercises = prev.filter(
                    (ex) => ex._id !== item._id
                  );
                  console.log("Exercises after deletion:", updatedExercises);
                  return updatedExercises;
                });
              }}
            />
          </View>
        )}
      />
      <Button title="Update Workout" onPress={updateWorkout} />
      <Button title="Delete Workout" onPress={deleteWorkout} color="red" />
    </View>
  );
};

export default EditWorkout;
