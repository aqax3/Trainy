import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { Switch } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";
import { color } from "react-native-reanimated";

type MarkedDates = {
  [date: string]: { marked: boolean };
};

type Workout = {
  _id: string;
  date: string | number | Date;
  completedStatus: boolean;
  workoutName: string; // Add this line
};

type CalendarRouteParams = {
  selectedWorkoutId?: string;
  selectedWorkoutName?: string;
};

const CalendarScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<Record<string, CalendarRouteParams>, string>>();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workoutsForDate, setWorkoutsForDate] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  // sets the currentWorkoutId state to the route param (this is needed so the state can get set to undefined after a workout has been added to the calendar)
  const initialSelectedWorkoutId = route.params?.selectedWorkoutId;
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | undefined>(
    initialSelectedWorkoutId
  );

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      console.log("Focused on CalendarScreen");
      fetchWorkouts();

      const workoutIdFromRoute = route.params?.selectedWorkoutId;
      setCurrentWorkoutId(workoutIdFromRoute);

      // Set up the 'blur' event listener
      const unsubscribe = navigation.addListener("blur", () => {
        console.log("Navigated away from CalendarScreen");

        // Reset currentWorkoutId when screen loses focus
        setCurrentWorkoutId(undefined);

        // Clear the route parameters when navigating away
        (navigation.setParams as any)({
          selectedWorkoutId: undefined,
          selectedWorkoutName: undefined,
        });
      });

      return unsubscribe; // Return the cleanup function to remove listener
    }, [navigation, route.params?.selectedWorkoutId]) // Add 'navigation' to the dependency array
  );

  const fetchWorkouts = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.get(
        "http://192.168.1.106:5001/workoutcalendar",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const data = response.data.map((w :  any) => ({
        _id: w._id,
        date: w.date,
        completedStatus: w.completed,
        workoutName: w.workout.name,
      }));
      //console.log("Fetched Workouts:", data); // Add this line

      setWorkouts(data);
      const dates = data.reduce((acc: MarkedDates, workout: Workout) => {
        const date = new Date(workout.date).toISOString().split("T")[0];
        acc[date] = { marked: true };
        return acc;
      }, {});
      setMarkedDates(dates);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  //fetches workouts that were added on the calendar and marks the calendar dates if they contain a workout
  useEffect(() => {
    const fetchWorkouts = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      fetch("http://192.168.1.106:5001/workoutcalendar", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setWorkouts(data);
          // Create an object of dates to mark on the calendar
          const dates = data.reduce((acc: MarkedDates, workout: Workout) => {
            const date = new Date(workout.date).toISOString().split("T")[0]; // Format the date as 'yyyy-mm-dd'
            acc[date] = { marked: true };
            return acc;
          }, {});
          setMarkedDates(dates);
        })
        .catch((error) => console.error(error));
    };

    fetchWorkouts();
  }, []);

  // adds workout on the date that the user presses on the calendar
  const onDayPress = async (day: any) => {
    console.log("Day Pressed:", day.dateString);

    if (markedDates[day.dateString]?.marked) {
      await fetchWorkouts();
      setSelectedDate(day.dateString);
      const workoutsForSelectedDate = workouts.filter(
        (workout) =>
          new Date(workout.date).toISOString().split("T")[0] === day.dateString
      );
      setWorkoutsForDate(workoutsForSelectedDate);
      console.log(workoutsForSelectedDate);
      if (workoutsForSelectedDate[0].completed === true) {
        setCompleted(true);
        console.log(completed);
      } else {
        setCompleted(false);
        console.log(completed);
      }
      return; // Add an explicit return here
    }

    // checks if there's a workout selected from the workout page, if not it just returns so no error is thrown
    if (!currentWorkoutId) {
      return;
    }

    // clears the workout from the route after setting it to state
    navigation.setOptions({
      params: {
        ...route.params,
        selectedWorkoutId: undefined,
        selectedWorkoutName: undefined,
      },
    });

    // adds the workout to the calendar
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const workoutData = {
        date: day.dateString,
        workout: currentWorkoutId,
      };
      const response = await axios.post(
        "http://192.168.1.106:5001/workoutcalendar",
        workoutData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 201) {
        setMarkedDates((prevState) => ({
          ...prevState,
          [day.dateString]: { marked: true },
        }));
        fetchWorkouts();
        Alert.alert("Success", "Workout added to the selected date!");
      } else {
        console.error(response.data);
        Alert.alert("Error", "Unable to add workout to the selected date.");
      }
    } catch (error) {
      console.error("Error adding workout to calendar:", error);
      Alert.alert(
        "Error",
        "An error occurred while adding workout to calendar."
      );
    }
  };

  // this functions renders the workouts of a selected date on the calendar
  const renderWorkoutsForDate = () => {
    if (selectedDate) {
      return (
        <Modal
          visible={!!selectedDate}
          onRequestClose={() => setSelectedDate(null)}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.workoutDate}>
                {new Date(selectedDate).toLocaleDateString()}{" "}
                {/* Assuming each modal is for a specific date */}
              </Text>
              {workoutsForDate.map((workout) => (
                <View key={workout._id} style={styles.workoutItem}>
                  <Text style={styles.workoutName}>{workout.workoutName}</Text>
                  <TouchableOpacity
                    style={
                      workout.completedStatus
                        ? styles.buttonActive
                        : styles.button
                    }
                    onPress={() =>
                      optimisticToggleCompleted(
                        workout._id,
                        !workout.completedStatus
                      )
                    }
                  >
                    <Text style={styles.statusText}>
                      {workout.completedStatus ? "Completed" : "Not Completed"}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.deleteButtonContainer}>
                    <Button
                      title="Delete"
                      onPress={() => deleteWorkout(workout._id)}
                      color="red"
                    />
                  </View>
                </View>
              ))}
              <Button
                title="Close"
                onPress={() => setSelectedDate(null)}
                color="#e5f4e3"
              />
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  };

  //function that lets the user toggle if the workout on the calendar is completed or not
  const toggleCompleted = async (id: string, completedStatus: boolean) => {
    const userToken = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.patch(
        `http://192.168.1.106:5001/workoutcalendar/${id}/completed`,
        { completed: completedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the local state to reflect the change
        const updatedWorkouts = workouts.map((workout) =>
          workout._id === id ? { ...workout, completed: completed } : workout
        );

        setWorkouts(updatedWorkouts);

        // You can also update `workoutsForDate` if necessary
        const updatedWorkoutsForDate = workoutsForDate.map((workout) =>
          workout._id === id ? { ...workout, completed: completed } : workout
        );

        setWorkoutsForDate(updatedWorkoutsForDate);
        return response.data;
      } else {
        console.error(response.data);
        Alert.alert("Error", "Unable to update workout completion status.");
      }
    } catch (error) {
      console.error("Error updating workout completion:", error);
      Alert.alert(
        "Error",
        "An error occurred while updating the workout completion status."
      );
    }
  };

  const optimisticToggleCompleted = async (id: string, newStatus: boolean) => {
    const updatedData = await toggleCompleted(id, newStatus);
    if (updatedData) {
      // If the server returns updated data, set the local state based on that data
      setWorkoutsForDate((prevWorkouts) => {
        return prevWorkouts.map((workout) =>
          workout._id === id
            ? { ...workout, completedStatus: newStatus }
            : workout
        );
      });
      setCompleted(newStatus);

      fetchWorkouts();
    } else {
      // If not, show an error or handle as needed
      console.error("Error toggling completion status.");
    }
  };

  //function that lets the user delete a workout from the calendar
  const deleteWorkout = async (id: string) => {
    if (!id || id == undefined) {
      console.error("No ID provided for deletion.");
      return;
    }
    const userToken = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.delete(
        `http://192.168.1.106:5001/workoutcalendar/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Workout deleted successfully!");

        // Update the workouts state and marked dates
        const updatedWorkouts = workouts.filter(
          (workout) => workout._id !== id
        );
        setWorkouts(updatedWorkouts);

        const dates = updatedWorkouts.reduce(
          (acc: MarkedDates, workout: Workout) => {
            const date = new Date(workout.date).toISOString().split("T")[0];
            acc[date] = { marked: true };
            return acc;
          },
          {}
        );
        setMarkedDates(dates);

        setSelectedDate(null);
        fetchWorkouts();
      } else {
        console.error(response.data);
        Alert.alert("Error", "Unable to delete workout.");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
      Alert.alert("Error", "An error occurred while deleting the workout.");
    }
  };

  return (
    <View style={styles.container}>
      {renderWorkoutsForDate()}
      <Text style={styles.headerText}>
        Selected workout: {route.params?.selectedWorkoutName}
      </Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          backgroundColor: "#1a2d3d",
          calendarBackground: "#1a2d3d",
          textSectionTitleColor: "#e5f4e3",
          textSectionTitleDisabledColor: "#4e937a",
          dayTextColor: "#e5f4e3",
          todayTextColor: "#92b4f4",
          selectedDayBackgroundColor: "#92b4f4",
          monthTextColor: "#e5f4e3",
          indicatorColor: "#92b4f4",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
          dotColor: "#4e937a",
          textDisabledColor: "#818589",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(26, 45, 61, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#4e937a",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  workoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  workoutDate: {
    color: "#e5f4e3",
    marginBottom: 20,
    fontSize: 18,
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  workoutName: {
    color: "#e5f4e3",
    fontSize: 16,
    flex: 1,
    fontWeight: "bold",
    marginLeft: 10
  },
  statusText: {
    color: "#e5f4e3",
    fontSize: 14, 
  },
  button: {
    backgroundColor: "#92b4f4",
    padding: 8,
    borderRadius: 5,
    flex: 1.5, 
    alignItems: "center", 
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
    flex: 1.25, 
    alignItems: "center", 
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1a2d3d",
    padding: 10,
  },
  deleteButtonContainer: {
    flex: 1, 
    marginLeft: 10,
  },
  headerText: {
    color: "#e5f4e3",
    marginBottom: 20,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
