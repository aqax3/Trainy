import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MarkedDates = {
  [date: string]: { marked: boolean };
};

type Workout = {
  date: string | number | Date;
};

const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [view, setView] = useState<string>("daily"); // Default view is 'daily'

  useEffect(() => {
    const fetchWorkouts = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      fetch("http://localhost:5001/workoutcalendar", {
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

  const changeView = (newView: string) => {
    setView(newView);
  };

  const renderCalendar = () => {
    switch (view) {
      case "daily":
        return <Calendar markedDates={markedDates} />; // Modify parameters for daily view
      case "weekly":
        return <Calendar markedDates={markedDates} />; // Modify parameters for weekly view
      case "monthly":
        return <Calendar markedDates={markedDates} />; // Modify parameters for monthly view
      default:
        return <Text>Error: Unknown view</Text>;
    }
  };

  return (
    <View>
      {/* Display workouts... */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button title="Daily" onPress={() => changeView("daily")} />
        <Button title="Weekly" onPress={() => changeView("weekly")} />
        <Button title="Monthly" onPress={() => changeView("monthly")} />
      </View>
      {renderCalendar()}
    </View>
  );
};

export default WorkoutScreen;
