import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker'; 

const AddWorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

  const submitWorkout = () => {
    fetch('http://yourserver.com/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ workoutName, description, duration, date }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
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
      <DatePicker
        date={date}
        mode="date"
        onDateChange={setDate}
      />
      <Button title="Add Workout" onPress={submitWorkout} />
    </View>
  );
};

export default AddWorkoutScreen;
