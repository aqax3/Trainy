import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyWorkoutScreen = () => {
  const navigation = useNavigation<any>();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [adminWorkouts, setAdminWorkouts] = useState<any[]>([]);

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

    const fetchAdminWorkouts = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          "http://192.168.1.106:5001/adminWorkouts",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setAdminWorkouts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminWorkouts();
    fetchWorkouts();
  }, []);

  return (
    <View>
      <View>
        <Text>MY WORKOUTS</Text>
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
                      selectedWorkoutName: workout.name,
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
      <View>
        <Text>COMMUNITY WORKOUTS</Text>
        {adminWorkouts.map((workout, index) => (
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
                      selectedWorkoutName: workout.name,
                    },
                  },
                });
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyWorkoutScreen;
