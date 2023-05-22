import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import DatePicker from "react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

import { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Home: { username: string };
  AddWorkoutScreen: undefined;
};

type AddWorkoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWorkoutScreen'>;

type Props = {
  navigation?: AddWorkoutScreenNavigationProp;
};

const AddWorkoutScreen = ({navigation}: Props) => {
  const [workoutName, setWorkoutName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title="Home"
            onPress={async () => {
              // Retrieve the username from async storage
              const username = await AsyncStorage.getItem("username");
              // Navigate back to Home page
              navigation.navigate('Home', {username: username as string});
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const submitWorkout = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      const response = await fetch("http://192.168.1.110:5000/workoutcalendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ workoutName, description, duration, date }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
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
      <TextInput
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <DatePicker date={date} mode="date" onDateChange={setDate} />
      <Button title="Add Workout" onPress={submitWorkout} />
    </View>
  );
};

export default AddWorkoutScreen;
