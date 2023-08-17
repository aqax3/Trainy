import React, { useState, useCallback } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyWorkoutScreen = () => {
  const navigation = useNavigation<any>();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [adminWorkouts, setAdminWorkouts] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchWorkouts = async () => {
        try {
          const userToken = await AsyncStorage.getItem("userToken");
          const response = await axios.get(
            "http://localhost:5001/workouts",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          setWorkouts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchAdminWorkouts = async () => {
        try {
          const userToken = await AsyncStorage.getItem("userToken");
          const response = await axios.get(
            "http://localhost:5001/adminWorkouts",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          setAdminWorkouts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchWorkouts();
      fetchAdminWorkouts();

      return () => {};
    }, [])
  );

  

  return (
    <View style={{ flex: 1, backgroundColor: "#1a2d3d", padding: 10 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.text, { fontSize: 20, fontWeight: "bold", alignSelf: 'center' }]}>
          MY WORKOUTS
        </Text>
        {workouts.map((workout, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              padding: 5,
              backgroundColor: "#2e4a62",
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate("WorkoutDetail", { workoutId: workout._id })
              }
            >
              <Text style={styles.text}>{workout.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate("EditWorkout", { workoutId: workout._id })
              }
            >
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate("App", {
                  screen: "HomeDrawer",
                  params: {
                    screen: "Calendar",
                    params: {
                      screen: "CalendarScreen",
                      params: {
                        selectedWorkoutId: workout._id,
                        selectedWorkoutName: workout.name,
                      },
                    },
                  },
                })
              }
            >
              <Text style={styles.text}>Add to Calendar</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateWorkoutScreen")}
          >
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Create New Workout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ color: "#e5f4e3", fontSize: 20, fontWeight: "bold", alignSelf: 'center' }}>
          COMMUNITY WORKOUTS
        </Text>
        {adminWorkouts.map((workout, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              padding: 5,
              backgroundColor: "#2e4a62",
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate("WorkoutDetail", { workoutId: workout._id })
              }
            >
              <Text style={{ color: "#e5f4e3" }}>{workout.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => {
                navigation.navigate("App", {
                  screen: "HomeDrawer",
                  params: {
                    screen: "Calendar",
                    params: {
                      screen: "CalendarScreen",
                      params: {
                        selectedWorkoutId: workout._id,
                        selectedWorkoutName: workout.name,
                      },
                    },
                  },
                });
              }}
            >
              <Text style={styles.text}>Add to Calendar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: "#2e4a62",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#e5f4e3",
  },
  text: {
    color: "#e5f4e3",
  },
  textWrapper: {
    borderColor: "#e5f4e3",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5, // Adjust this value to manage the spacing around the text
    alignSelf: "flex-start", // To make the view wrap only around the text content
  },
});

export default MyWorkoutScreen;
