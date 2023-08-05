import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const CreateWorkoutScreen = () => {
    const [workoutName, setWorkoutName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const submitWorkout = async () => {
        try {
            const userToken = await AsyncStorage.getItem("userToken");
            const userId = await AsyncStorage.getItem("userId");

            const response = await axios.post(
                "http://localhost:5001/workouts",
                {
                    userId,
                    name: workoutName,
                    description,
                    duration,
                    difficulty
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            Alert.alert("Workout Created Successfully!");

        } catch (error) {
            console.error(error);
            Alert.alert("Failed to Create Workout.");
        }
    };

    const searchExercises = async () => {
        try {
            const userToken = await AsyncStorage.getItem("userToken");
            
            const response = await axios.get(`http://localhost:5001/exercises/${searchInput}`, {
                params: {
                    query: searchInput
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            
            setSearchResults(response.data);
    
        } catch (error) {
            console.error(error);
            Alert.alert("Failed to fetch exercises.");
        }
    };
    

    const onExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
    };

    return (
        <View>
            <Text>Workout Name</Text>
            <TextInput
                placeholder="Workout Name"
                onChangeText={(text) => setWorkoutName(text)}
            />

            <Text>Description</Text>
            <TextInput
                placeholder="Description"
                onChangeText={(text) => setDescription(text)}
            />

            <Text>Duration</Text>
            <TextInput
                placeholder="Duration"
                onChangeText={(text) => setDuration(text)}
                keyboardType="numeric"
            />

            <Text>Difficulty</Text>
            <TextInput
                placeholder="Difficulty"
                onChangeText={(text) => setDifficulty(text)}
            />

            <TextInput
                placeholder="Search Exercises"
                value={searchInput}
                onChangeText={setSearchInput}
                onSubmitEditing={searchExercises}
            />
            
            
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onExerciseSelect(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            {selectedExercise && (
                <View>
                    <Text>{selectedExercise.name}</Text>
                    {selectedExercise.withWeight && (
                        <TextInput
                            placeholder="Weight"
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                        />
                    )}
                    <TextInput
                        placeholder="Sets"
                        value={sets}
                        onChangeText={setSets}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Reps"
                        value={reps}
                        onChangeText={setReps}
                        keyboardType="numeric"
                    />
                </View>
            )}

            <Button title="Submit" onPress={submitWorkout} />
        </View>
    );
};

export default CreateWorkoutScreen;
