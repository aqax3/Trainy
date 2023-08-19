import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, TouchableHighlight } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "../Exercises/ExerciseDetails";

import CookieManager from "@react-native-cookies/cookies";

import { useLayoutEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { Header } from "@rneui/base";

type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Home: { username: string };
  MyWorkoutScreen: undefined;
  HomeDrawer: {
    screen: string;
    params?: {
      screen: string;
      params?: {
        exerciseId?: string;
        workoutId?: string;
      };
    };
  };
  Workouts: { screen: string; exercisesId: string };
  ExerciseDetails: { exerciseId: string | number };
  Workout: {
    screen: string;
    params?: {
      WorkoutDetails: {
        workoutId?: string;
      };
    };
  };
};


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation?: HomeScreenNavigationProp;
  route?: { params: { username: string } };
};
type Workout = {
  workout: {
    name?: string;
    _id?: string;
  };
};

export default function HomePage({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendedDifficulty, setRecommendedDifficulty] = useState("");
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [latestExercises, setLatestExercises] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
      const hideModal = await AsyncStorage.getItem("hideModal");

      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios
        .get("https://trainy-app-99e3d8c3fb24.herokuapp.com/recommendations", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setRecommendedDifficulty(response.data.recommendedDifficulty);
          if (
            hideModal !== "true" &&
            response.data.recommendedDifficulty !== "beginner" &&
            response.data.recommendedDifficulty !== "none"
          ) {
            setModalVisible(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });

      try {
        const response = await axios.get(
          "https://trainy-app-99e3d8c3fb24.herokuapp.com/workoutcalendar/today",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data && response.data.workout) {
          setTodayWorkout(response.data);
          setIsWorkoutCompleted(response.data.completed);
        } else {
          setTodayWorkout({
            workout: {
              name: "Rest Day",
            },
          });
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          setTodayWorkout({
            workout: {
              name: "Rest Day",
            },
          });
        } else {
          console.error("Error fetching today's workout:", error);
        }
      }
    })();

    const fetchLatestExercises = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const response = await axios.get(
          "https://trainy-app-99e3d8c3fb24.herokuapp.com/exercises-latest",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setLatestExercises(response.data);
      } catch (error: any) {
        console.error(
          "Error fetching latest exercises:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchLatestExercises();
  }, [isFocused]);

  function LatestExercises({ navigation }: Props) {
    return (
      <View style={styles.latestExercisesContainer}>
        <Text style={styles.cardsHeaderText}>Try some new exercises</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {latestExercises.map((exercise, index) => (
            <ImageBackground
              source={{ uri: (exercise as Exercise).imageURL }} // Assuming the image URL is stored in the 'imageUrl' property of the exercise object
              style={styles.exerciseCardImage}
              key={index}
            >
              <TouchableHighlight
                style={styles.exerciseCard}
                onPress={() => {
                  console.log(
                    "Selected exerciseId:",
                    (exercise as Exercise)._id
                  );
                  console.log("selected exercise", exercise as Exercise); // Log the exerciseId
                  navigation?.navigate("HomeDrawer", {
                    screen: "Exercises",
                    params: {
                      screen: "ExerciseDetails",
                      params: {
                        exerciseId: (exercise as Exercise)._id,
                      },
                    },
                  });
                }}
              >
                <Text style={styles.cardText}>
                  {(exercise as Exercise).name}
                </Text>
              </TouchableHighlight>
            </ImageBackground>
          ))}
        </ScrollView>
      </View>
    );
  }

  function WorkoutPlan({ navigation }: Props) {
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${days[today.getDay()]} ${today.getDate()} ${
      months[today.getMonth()]
    }`;
    const restDayImageUrl =
      "https://images.squarespace-cdn.com/content/v1/57a1427c46c3c493fb92dfde/1598847784198-AFFUOU3YA8JK3ZZRLL3Z/Day+of+rest.PNG";
    return (
      <View style={styles.workoutPlanContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.workoutPlanText}>Today's Workout Plan</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.workoutCardContainer}>
          <View style={styles.workoutCard}>
            {todayWorkout?.workout?.name === "Rest Day" ? (
              <ImageBackground
                source={{ uri: restDayImageUrl }}
                style={styles.imageBackground}
              >
                <Text style={styles.noWorkoutText}>Enjoy your rest day!</Text>
              </ImageBackground>
            ) : (
              <TouchableHighlight
                style={styles.workoutImage}
                onPress={() => {
                  navigation?.navigate("Workout", {
                    screen: "WorkoutDetail",
                    params: {
                      WorkoutDetails: {
                        workoutId: todayWorkout?.workout._id
                      }
                    }
                  });
                  
                }}
              >
                <ImageBackground
                  source={{
                    uri: "https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&w=1600",
                  }}
                  style={styles.imageBackground}
                >
                  <Text style={styles.workoutNameText}>
                    {todayWorkout?.workout?.name}
                  </Text>
                  <View style={styles.completionStatusContainer}>
                    {isWorkoutCompleted ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="green"
                      />
                    ) : (
                      <Ionicons name="close-circle" size={24} color="red" />
                    )}
                  </View>
                </ImageBackground>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </View>
    );
  }

  function WorkoutCards({ navigation }: Props) {
    return (
      <View style={styles.cardsContainer}>
        <Text style={styles.cardsHeaderText}>Your Workouts</Text>

        <View style={styles.cardsRow}>
          <TouchableHighlight
            style={styles.card}
            onPress={() =>
              navigation?.navigate("HomeDrawer", {
                screen: "Workout",
                params: {
                  screen: "MyWorkout",
                },
              })
            }
          >
            <Text style={styles.cardText}>My Workout</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.card}
            onPress={() =>
              navigation?.navigate("HomeDrawer", {
                screen: "Workout",
                params: {
                  screen: "CreateWorkoutScreen",
                },
              })
            }
          >
            <Text style={styles.cardText}>Create Workout</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  //function that handles the hiding of modal
  const handleDontShowAgain = async () => {
    try {
      await AsyncStorage.setItem("hideModal", "true");
      setModalVisible(false);
    } catch (error) {
      console.error("Error hiding modal:", error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#1a2d3d" }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome <Text style={styles.boldText}>{username}</Text>
        </Text>
        <WorkoutPlan />
        <WorkoutCards navigation={navigation} />
        <LatestExercises navigation={navigation} />
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Consider trying a {recommendedDifficulty} workout!
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#4e937a" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "red" }}
                onPress={handleDontShowAgain}
              >
                <Text style={styles.textStyle}>Don't show again</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2d3d",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 50,
    margin: 20,
    backgroundColor: "#4e937a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 1,
    marginBottom: 5,
  },
  textStyle: {
    color: "#e5f4e3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#e5f4e3",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 30,
    color: "#e5f4e3",
    position: "absolute",
    top: 20,
    left: 30,
  },
  boldText: {
    fontWeight: "bold",
  },
  workoutPlanContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  workoutPlanText: {
    fontSize: 20,
    color: "#e5f4e3",
  },
  dateText: {
    fontSize: 18,
    color: "#5e7ce2",
  },
  workoutCardContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    width: "95%",
    height: 210,
    overflow: "hidden",
  },
  workoutCard: {
    flex: 1,
    padding: 15,
  },
  workoutImage: {
    height: 180,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    overflow: "hidden",
    resizeMode: "cover",
  },
  workoutNameText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  noWorkoutText: {
    fontSize: 20,
    color: "#e5f4e3",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    padding: 5,
  },
  completionStatusContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  checkmark: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
  },
  cross: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },

  cardsContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 0,
  },
  cardsHeaderText: {
    fontSize: 24,
    color: "#e5f4e3",
    marginBottom: 10,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  card: {
    flex: 1,
    backgroundColor: "#4E937A",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "#e5f4e3",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "black", // Shadow color
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  latestExercisesContainer: {
    width: "95%",
    alignItems: "center",
    marginVertical: 10,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  exerciseCardImage: {
    width: 180,
    height: 180,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e5f4e3",
    overflow: "hidden",
  },

  exerciseCard: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});
