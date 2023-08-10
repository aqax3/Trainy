import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyWorkoutScreen = () => {
  const navigation = useNavigation<any>();
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get("http://192.168.1.106:5001/workouts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        setWorkouts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <View>
      {workouts.map((workout, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text>{workout.name}</Text>
          <Button
            title="Add to Calendar"
            onPress={() => {
              // Navigate to Calendar tab
              navigation.navigate("App", {
                screen: "Calendar",
                params: {
                  screen: "CalendarScreen",
                  params: {
                    selectedWorkoutId: workout._id,
                    selectedWorkoutName: workout.name
                  },
                },
              });
            }}
          />
        </View>
      ))}
      <Button
        title="Create New Workout"
        onPress={() => navigation.navigate("CreateWorkoutScreen")}
      />
    </View>
  );
};

export default MyWorkoutScreen;
