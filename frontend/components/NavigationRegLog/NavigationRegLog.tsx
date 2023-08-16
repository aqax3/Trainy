import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { View } from "react-native";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import HomePage from "../HomePage/HomePage";
import myWorkoutScreen from "../Workouts/myWorkout";
import WorkoutScreen from "../Calendar/Calendar";
import ExerciseList from "../Exercises/ExerciseList";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ExerciseDetails from "../Exercises/ExerciseDetails";
import createWorkoutScreen from "../Workouts/createWorkout";
import CalendarScreen from "../Calendar/Calendar";
import EditWorkout from "../Workouts/EditWorkout";
import WorkoutStatistics from "../Statistics/Statstics";
import ProfileScreen from "../Profile/Profile";
import WorkoutDetailScreen from "../Workouts/WorkoutDetailScreen";
import { CommonActions } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

interface NavigationStackProps {
  initialRouteName: string;
}

export default function NavigationRegLog({
  initialRouteName,
}: NavigationStackProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="App"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#1a2d3d",
        },
        drawerLabelStyle: { color: "#e5f4e3" },
        drawerActiveBackgroundColor: "#2e4e6f",
        drawerActiveTintColor: "#92b4f4",
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeTabs}
        options={{
          headerTintColor: "#e5f4e3",
          drawerIcon: ({ size, color }) => (
            <Fontisto name="home" size={24} color="white" />
          ),
          title: "Home",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1a2d3d",
            borderBottomWidth: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />
      <Drawer.Screen
        name="Statistics"
        component={StatisticsStack}
        options={{
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="bar-chart" size={24} color="#E5F4E3" />
          ),
          headerStyle: {
            backgroundColor: "#1a2d3d",
            borderTopWidth: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
          headerTitle: "",
          headerTintColor: "#e5f4e3",
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="account-circle" size={24} color="#E5F4E3" />
          ),
          headerStyle: {
            backgroundColor: "#1a2d3d",
            borderTopWidth: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
          headerTitle: "",
          headerTintColor: "#e5f4e3",
        }}
      />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  const [isRendered, setIsRendered] = useState({
    Home: false,
    Workout: false,
    Exercises: false,
    Calendar: false,
  });

  useEffect(() => {
    setIsRendered({
      Home: true,
      Workout: true,
      Exercises: true,
      Calendar: true,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1a2d3d",
        tabBarInactiveTintColor: "#1a2d3d",
        tabBarStyle: {
          backgroundColor: "#1a2d3d",
          borderTopWidth: 0,
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          height: 120,
          position: "absolute",
          shadowColor: "#000",
          bottom: -40,
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused ,size, color }) => (
            <Fontisto name="home" size={24} color={focused ? '#4e937a' : '#e5f4e3'} />
          ),
        }}
      />

      <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{
          tabBarIcon: ({focused,  size, color }) => (
            <MaterialCommunityIcons name="run-fast" size={30} color={focused ? '#4e937a' : '#e5f4e3'} />
          ),
          headerStyle: {
            backgroundColor: "#1a2d3d",
          },
          headerTitleStyle: {
            color: "#E5F4E3",
          },
          headerTitle: "Workouts",
        }}
      />

      <Tab.Screen
        name="Exercises"
        component={ExerciseStack}
        options={{
          headerStyle: {
            backgroundColor: "#1a2d3d",
          },
          headerTitleStyle: {
            color: "#E5F4E3",
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-barbell-sharp" size={24} color={focused ? '#4e937a' : '#e5f4e3'} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent the default action (i.e., navigating to the tab)
            e.preventDefault();

            // Reset the ExerciseStack to start with ExerciseList
            navigation.jumpTo("Exercises");

            // Navigate to the desired screen (it will be ExerciseList as we reset it above)
            navigation.navigate("ExerciseList");
          },
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-calendar" size={24} color={focused ? '#4e937a' : '#e5f4e3'} />
          ),
          headerStyle: {
            backgroundColor: "#1a2d3d",
            borderBottomWidth: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            color: "#E5F4E3",
          },
        }}
      />
    </Tab.Navigator>
  );
}

function ExerciseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{ headerTitle: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyWorkout"
        component={myWorkoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateWorkoutScreen"
        component={createWorkoutScreen}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="EditWorkout"
        component={EditWorkout}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ headerTitle: "Workout details" }}
      />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function StatisticsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StatisticsScreen"
        component={WorkoutStatistics}
        options={{
          headerStyle: {
            backgroundColor: "#1a2d3d",
            shadowOpacity: 0, // for iOS
            elevation: 0, // for Android
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: "#E5F4E3",
          },
          headerTitle: "Statistics",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1a2d3d",
            shadowOpacity: 0, // for iOS
            elevation: 0, // for Android
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: "#E5F4E3",
          },
          headerTitle: "Profile",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

// log out button
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const logoutUser = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("hideModal");
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ position: "absolute", bottom: 30, width: "100%" }}>
        <DrawerItem
          label="Logout"
          onPress={logoutUser}
          labelStyle={{ color: "#e5f4e3" }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" size={24} color="#e5f4e3" />
          )}
        />
      </View>
    </View>
  );
}
