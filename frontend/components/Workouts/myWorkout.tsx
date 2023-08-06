import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
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
        <Text key={index}>{workout.name}</Text>
      ))}
      <Button
        title="Create New Workout"
        onPress={() => navigation.navigate("CreateWorkoutScreen")}
      />


    </View>
  );
};

export default MyWorkoutScreen;
