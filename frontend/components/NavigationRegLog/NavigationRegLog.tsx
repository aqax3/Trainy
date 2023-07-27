import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import HomePage from '../HomePage/HomePage';
import AddWorkoutScreen from '../Calendar/addWorkout';
import WorkoutScreen from '../Calendar/Calendar';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} options={{tabBarIcon: ({size, color}) => (<Fontisto name="home" size={24} color="black" />),}}/>
      <Tab.Screen name="AddWorkout" component={AddWorkoutScreen} options={{tabBarIcon: ({size, color}) => (<Ionicons name="ios-stats-chart-sharp" size={24} color="black" />)}}/>
      <Tab.Screen name="Workout" component={WorkoutScreen} />
    </Tab.Navigator>
  );
}

export default function NavigationRegLog() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Register" component={RegistrationForm} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="App" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
