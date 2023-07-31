import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import HomePage from '../HomePage/HomePage';
import AddWorkoutScreen from '../Calendar/addWorkout';
import WorkoutScreen from '../Calendar/Calendar';
import ExerciseList from '../Exercises/ExerciseList';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ExerciseDetails from '../Exercises/ExerciseDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface NavigationStackProps {
  initialRouteName: string;
}

export default function NavigationRegLog({initialRouteName}: NavigationStackProps ) {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="App" component={HomeTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Register" component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} options={{tabBarIcon: ({size, color}) => (<Fontisto name="home" size={24} color="black" />),}}/>
      <Tab.Screen name="AddWorkout" component={AddWorkoutScreen} options={{tabBarIcon: ({size, color}) => (<Ionicons name="ios-stats-chart-sharp" size={24} color="black" />)}}/>
      <Tab.Screen name="Exercises" component={ExerciseStack} options={{tabBarIcon: ({size, color}) => (<Ionicons name="ios-barbell-sharp" size={24} color="black" />)}} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
    </Tab.Navigator>
  );
}

function ExerciseStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="ExerciseList" component={ExerciseList} options={{ headerShown: false }}/>
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} options={{ headerTitle: "" }}/>
    </Stack.Navigator>
  )
}
