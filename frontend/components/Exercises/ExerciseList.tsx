import React, { useState, useEffect } from "react";
import axios from "axios";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscleGroup: "chest" | "back" | "arms" | "abdominals" | "legs" | "shoulders";
  videoURL: string;
  imageURL: string;
}

type StackParamList = {
  ExerciseList: undefined;
  ExerciseDetails: { exerciseId: string };
  WorkoutDetailScreen: { workoutId: string };
};

export default function ExerciseList() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(
    null
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  const navigation =
    useNavigation<StackNavigationProp<StackParamList, "ExerciseList">>();

  const scrollY = new Animated.Value(0);
  const gradientOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Function to fetch all exercises
  const getAllExercises = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `https://trainy-app-99e3d8c3fb24.herokuapp.com/exercises`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // run function to get all exercises
  useEffect(() => {
    getAllExercises();
  }, []);

  // When muscle group dropdown is changed or exercises state updates,
  // update filteredExercises to show exercises of selected muscle group
  useEffect(() => {
    if (selectedMuscleGroup) {
      const filtered = exercises.filter(
        (exercise) => exercise.muscleGroup === selectedMuscleGroup
      );
      setFilteredExercises(filtered);
    } else {
      setFilteredExercises(exercises);
    }
  }, [selectedMuscleGroup, exercises]);

  // When the search query is changed,
  // filter exercises based on the text and set them to filteredExercises
  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = exercises.filter((exercise) => {
      if (selectedMuscleGroup && exercise.muscleGroup !== selectedMuscleGroup) {
        return false;
      }
      return exercise.name.toLowerCase().includes(query);
    });

    setFilteredExercises(filtered);
  }, [searchQuery]);

  //loading indicator for exercises
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {
        //SEARCH BAR
      }
      <View style={styles.pickerSearchContainer}>
        <View style={styles.pickerInnerContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for exercises..."
            placeholderTextColor="#e5f4e3"
            style={styles.input}
          />
          {
            //DROP DOWN MENU
          }
          <ModalDropdown 
    options={[
        'Select a muscle group',
        'CHEST',
        'BACK',
        'ARMS',
        'LEGS',
        'SHOULDERS',
        'ABDOMINALS',
    ]}
    defaultValue={'Select a muscle group'}
    onSelect={(index, value) => {
        switch (value) {
            case 'CHEST':
                setSelectedMuscleGroup('chest');
                break;
            case 'BACK':
                setSelectedMuscleGroup('back');
                break;
            case 'ARMS':
                setSelectedMuscleGroup('arms');
                break;
            case 'LEGS':
                setSelectedMuscleGroup('legs');
                break;
            case 'SHOULDERS':
                setSelectedMuscleGroup('shoulders');
                break;
            case 'ABDOMINALS':
                setSelectedMuscleGroup('abdominals');
                break;
            default:
                setSelectedMuscleGroup(null);
                break;
        }
        
    }}
    style={styles.modalDropdown} // Add this line
    textStyle={styles.modalDropdownText} // Add this line
    dropdownStyle={styles.modalDropdownList} // Add
/>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 75, marginBottom: 0 }}
      >
        {filteredExercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ExerciseDetails", {
                exerciseId: exercise._id,
              })
            }
          >
            <Card key={index} containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{exercise.name}</Card.Title>
              <Image
                source={{ uri: exercise.imageURL }}
                style={styles.image}
                resizeMode="cover"
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a2d3d",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#4e937a",
    borderRadius: 10,
    marginBottom: 10,
    color: "#e5f4e3",
    backgroundColor: "#4e937a",
  },
  searchBar: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 15,
    color: "#e5f4e3",
    backgroundColor: "#4e937a",
  },
  pickerSearchContainer: {},
  pickerInnerContainer: {},
  pickerContainer: {
    borderWidth: 3,
    borderColor: "#4e937a",
    borderRadius: 10,
  },
  pickerInputAndroid: {
    color: "#e5f4e3",
    backgroundColor: "#4e937a",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: "center",
  },
  pickerInputIOS: {
    color: "#e5f4e3",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 13,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1a2d3d",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#92b4f4",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // this is needed for Android
  },
  cardTitle: {
    color: "#e5f4e3",
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 10,
    borderRadius: 15,
  },
  modalDropdown: {
    backgroundColor: '#92b4f4',
    paddingVertical: 10, 
    paddingHorizontal: 15,
    borderRadius: 10, 
    height: 50, // adjust as needed
    justifyContent: 'center',
},
modalDropdownText: {
    color: '#e5f4e3',
    fontSize: 16, // adjust as needed
},
modalDropdownList: {
    backgroundColor: '#92b4f4',
    borderColor: '#e5f4e3',
    borderWidth: 2,
    marginTop: 10, // adds a little spacing between button and list
    width: '90%', // You can adjust this based on your design preferences
    borderRadius: 5,
},

});
