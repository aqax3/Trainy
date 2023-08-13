import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps
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
import ExerciseDetails from "../Exercises/ExerciseDetails";
import createWorkoutScreen from "../Workouts/createWorkout";
import CalendarScreen from "../Calendar/Calendar";
import EditWorkout from "../Workouts/EditWorkout";
import WorkoutStatistics from "../Statistics/Statstics";

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
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeTabs}
        options={{
          drawerIcon: ({ size, color }) => (
            <Fontisto name="home" size={24} color="black" />
          ),
          title: "Home",
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Statistics"
        component={StatisticsStack}
        options={{
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="bar-chart" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Fontisto name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-stats-chart-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExerciseStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-barbell-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-calendar" size={24} color="black" />
          ),
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
        options={{ headerTitle: "" }}
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
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

// log out button
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const logoutUser = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("username");
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ position: 'absolute', bottom: 30, width: '100%' }}>
        <DrawerItem
          label="Logout"
          onPress={logoutUser}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          )}
        />
      </View>
    </View>
  );
}
