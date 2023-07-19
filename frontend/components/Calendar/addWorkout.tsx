import React, { useEffect, useState } from 'react';
import { View, Button, Platform, Alert, TextInput } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Home: { username: string };
  AddWorkoutScreen: undefined;
};

type AddWorkoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddWorkoutScreen"
>;

type Props = {
  navigation?: AddWorkoutScreenNavigationProp;
};

const AddWorkoutScreen = ({ navigation }: Props) => {
  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [workout, setWorkout] = useState("");
  const [workouts, setWorkouts] = useState<any[]>([]);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title="Home"
            onPress={async () => {
              const username = await AsyncStorage.getItem("username");
              navigation.navigate("Home", { username: username as string });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get("http://192.168.1.13:5001/workouts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          }
        });

        setWorkouts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const submitWorkout = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
  
      const response = await fetch(
        "http://192.168.1.13:5001/workoutcalendar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ user: userId, date, workout }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        display="default"
        onChange={onChange}
      />
      <Picker
  selectedValue={workout}
  onValueChange={(itemValue: string | number, itemIndex: number) => 
    setWorkout(itemValue.toString())
  }
>
  {workouts.map((workout, index) => (
    <Picker.Item key={index} label={workout.name} value={workout._id} />
  ))}
</Picker>
      <Button title="Add Workout" onPress={submitWorkout} />
    </View>
  );
};

export default AddWorkoutScreen;
