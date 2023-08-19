import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native"; // Add this import
import { Divider } from "@rneui/base";

type EditWorkoutRouteProp = RouteProp<
  { EditWorkout: { workoutId: string } },
  "EditWorkout"
>;

type EditWorkoutNavigationProp = StackNavigationProp<
  { EditWorkout: { workoutId: string } },
  "EditWorkout"
>;

type Props = {
  route: EditWorkoutRouteProp;
  navigation: EditWorkoutNavigationProp;
};

const EditWorkout = ({ route, navigation }: Props) => {
  const workoutId = route.params.workoutId;

  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [exerciseDetails, setExerciseDetails] = useState([]);
  const [expandedExerciseId, setExpandedExerciseId] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          `https://trainy-app-99e3d8c3fb24.herokuapp.com/workouts/${workoutId}`,
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
        setDuration(workout.duration);
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
        `https://trainy-app-99e3d8c3fb24.herokuapp.com/workouts/${workoutId}`,
        {
          name: workoutName,
          description,
          duration,
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
      await axios.delete(`https://trainy-app-99e3d8c3fb24.herokuapp.com/workouts/${workoutId}`, {
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
    <ScrollView style={styles.container}>
      <Text style={styles.labelText}>Workout Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
        placeholderTextColor={"#92b4f4"}
      />
      <Text style={styles.labelText}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={"#92b4f4"}
      />
      <Text style={styles.labelText}>Duration:</Text>
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration.toString()}
        onChangeText={(text) => {
          const numericValue = parseInt(text, 10);
          if (!isNaN(numericValue)) {
            // Ensure it's a valid number
            setDuration(numericValue);
          } else {
            setDuration(0); // or any default value
          }
        }}
        keyboardType="numeric"
        placeholderTextColor={"#92b4f4"}
      />

      <Divider width={5}></Divider>

      <Text style={styles.labelText}>Exercises:</Text>
      <FlatList
        data={exerciseDetails}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.labelText}>{item.name}</Text>

            <TouchableOpacity
              onPress={() => {
                setExpandedExerciseId(
                  expandedExerciseId === item._id ? null : item._id
                );
              }}
            >
              <Text style={{ color: "#e5f4e3" }}>Show/Hide Details</Text>
            </TouchableOpacity>
            {expandedExerciseId === item._id && (
              <>
                <Text style={styles.labelText}>Sets:</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Sets"
                  placeholderTextColor={"#92b4f4"}
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
                <Text style={styles.labelText}>Reps:</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Reps"
                  placeholderTextColor={"#92b4f4"}
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
                {item.weight ? (
                  <>
                    <Text style={styles.labelText}>Weight:</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Weight"
                      placeholderTextColor={"#92b4f4"}
                      value={item.weight.toString()}
                      onChangeText={(text) => {
                        const updatedExercises = [...exerciseDetails];
                        const index = updatedExercises.findIndex(
                          (ex) => ex._id === item._id
                        );
                        updatedExercises[index].weight = text
                          ? parseFloat(text)
                          : "";
                        setExerciseDetails(updatedExercises);
                      }}
                    />
                  </>
                ) : null}
                <View style={styles.button}>
                  <Button
                    title="Delete Exercise"
                    color="#e5f4e3"
                    onPress={() => {
                      console.log("Deleting exercise with ID:", item._id);
                      console.log(
                        "Exercises before deletion:",
                        exerciseDetails
                      );
                      setExerciseDetails((prev) => {
                        const updatedExercises = prev.filter(
                          (ex) => ex._id !== item._id
                        );
                        console.log(
                          "Exercises after deletion:",
                          updatedExercises
                        );
                        return updatedExercises;
                      });
                    }}
                  />
                </View>
              </>
            )}
          </View>
        )}
      />
      <View style={styles.button}>
        <Button
          title="Update Workout"
          onPress={updateWorkout}
          color="#e5f4e3"
        />
      </View>
      <View style={styles.deleteButton}>
        <Button
          title="Delete Workout"
          onPress={deleteWorkout}
          color="#e5f4e3"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1a2d3d",
    flex: 1,
  },
  labelText: {
    fontWeight: "bold",
    color: "#e5f4e3",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#4e937a",
    color: "#e5f4e3",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#4e937a",
    color: "#e5f4e3",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    color: "#e5f4e3",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default EditWorkout;
