import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import HomePage from '../HomePage/HomePage';
import AddWorkoutScreen from '../Calendar/addWorkout';
import WorkoutScreen from '../Calendar/Calendar';

const Stack = createStackNavigator();

interface NavigationStackProps {
    initialRouteName: string;
  }

export default function NavigationStack( {initialRouteName}: NavigationStackProps ) {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName} >
                <Stack.Screen name="Register" component={RegistrationForm} />
                <Stack.Screen name="Login" component={LoginForm} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} />
                <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}