import { StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import {
  Button,
  lightColors,
  createTheme,
  ThemeProvider,
  Input,
  Icon,
} from "@rneui/themed";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import GradientText from "./GradientText";

// Type definitions for navigation between screens
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

// Type definitions for tab navigation parameters
type AppTabParamList = {
  Home: { username: string };
  MyWorkoutScreen: undefined;
  WorkoutScreen: undefined;
};

// Root stack type definitions including the nested tab navigator
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  App: {
    screen: keyof AppTabParamList;
    params: AppTabParamList[keyof AppTabParamList];
  };
};

// Type definition for component props
type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginForm({ navigation }: Props) {
  // State variables for form inputs and login status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // Function to log in the user
  const loginUser = async () => {
    try {
      // Sends a POST request to log in the user
      const response = await axios.post(
        "https://trainy-app-99e3d8c3fb24.herokuapp.com/login-user",
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
      await AsyncStorage.setItem("userToken", response.data.userToken);
      await AsyncStorage.setItem("username", response.data.user.username);

      // Navigates to the 'Home' screen with the 'username' parameter
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "App",
            params: {
              screen: "Home",
              params: { username: response.data.user.username },
            },
          },
        ],
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLoginStatus(error.response.data);
      } else {
        setLoginStatus("Registration failed!");
      }
    }
  };

  // The component's UI
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <GradientText style={styles.welcomeText}>WELCOME TO TRAINY</GradientText>
        <Text style={styles.status}>{loginStatus}</Text>
        <Input
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor="#92b4f4"
          leftIcon={<AntDesign name="user" size={24} color="#e5f4e3" />}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Input
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#92b4f4"
          secureTextEntry={true}
          leftIcon={
            <Ionicons name="lock-closed-outline" size={24} color="#e5f4e3" />
          }
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Button title="Login" onPress={loginUser} style={styles.loginButton} />
        <Button
          title="Don't have an account yet? Click here to register."
          type="clear"
          size="sm"
          onPress={() => navigation.navigate("Register")}
          style={styles.registerButton}
        />
      </View>
    </ThemeProvider>
  );
}

// Theme configuration for the UI library
const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: {
        ...lightColors.platform.android,
        primary: "#4e937a",
        secondary: "#92b4f4",
      },
      ios: {
        ...lightColors.platform.ios,
        primary: "#4e937a",
        secondary: "#92b4f4",
      },
    }),
  },
});

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    textTransform: "uppercase",
  },
  container: {
    paddingTop: 10, 
    paddingBottom: 100,
    flex: 1,
    backgroundColor: "#1a2d3d",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  status: {
    color: "#ffefd5",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#4e937a",
    borderRadius: 10,
    color: "#e5f4e3",
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#4e937a",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  registerButton: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
