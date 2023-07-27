
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