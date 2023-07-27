import { StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react"; 
import axios from "axios"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { Platform } from "react-native"; 
import { Button, lightColors, createTheme, ThemeProvider, Input, Icon } from '@rneui/themed'; 
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import { StackNavigationProp } from '@react-navigation/stack'; 

// Type definitions for navigation between screens
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Type definitions for tab navigation parameters
type AppTabParamList = {
  Home: { username: string };
  AddWorkoutScreen: undefined;
  WorkoutScreen: undefined;
};

// Root stack type definitions including the nested tab navigator
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  App: { screen: keyof AppTabParamList; params: AppTabParamList[keyof AppTabParamList] };
};

// Type definition for component props
type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginForm({navigation}: Props) {
  // State variables for form inputs and login status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // Function to log in the user
  const loginUser = async () => {
    try {
      // Sends a POST request to log in the user
      const response = await axios.post(
        "http://localhost:5001/login-user",
        {
          username,
          password,
        }
      );

      // Resets the form and updates the login status
      setUsername("");
      setPassword("");
      setLoginStatus("Login successful!");

      // Stores the user token and username using AsyncStorage
      await AsyncStorage.setItem('userToken', response.data.userToken);
      await AsyncStorage.setItem('username', response.data.user.username);

      // Navigates to the 'Home' screen with the 'username' parameter
      navigation.navigate('App', { screen: 'Home', params: { username: response.data.user.username } });
    } catch (error) {
      console.error(error);
      setLoginStatus("Login failed!");
    }
  };

  // The component's UI
  return (
    <ThemeProvider theme={theme}>
      <Text>{loginStatus}</Text>
      <Input
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        leftIcon={
          <AntDesign
            name="user"
            size={24}
            color='black' 
          />
        }
      />
      <Input
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color='black' 
          />
        }
      />
      <Button title="Login" onPress={loginUser} />
      <Button title="Don't have an account yet? Click here to register." type="clear" size="sm" onPress={() => navigation.navigate('Register')} />
    </ThemeProvider>
  );
}

// Theme configuration for the UI library
const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
})

// Stylesheet for the component's UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});
