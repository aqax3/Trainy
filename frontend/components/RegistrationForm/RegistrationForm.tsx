import { StyleSheet, Text, TextInput, View } from "react-native";
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

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

export default function RegistrationForm({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const isValidPassword = (password) => {
    // Minimum 6 characters, 1 special character and one number
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[\s\S]{6,}$/;
    return regex.test(password);
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setRegistrationStatus("Passwords do not match!");
      return;
    }

    if (!isValidPassword(password)) {
      setRegistrationStatus(
        "Password must be at least 6 characters, contain 1 special character, and 1 number!"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/register-user",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setUsername("");
        setPassword("");
        setRegistrationStatus("Registration successful!");

        navigation.navigate("Login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setRegistrationStatus(error.response.data);
      } else {
        setRegistrationStatus("Registration failed!");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.status}>{registrationStatus}</Text>
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
        <Input
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          placeholderTextColor="#92b4f4"
          secureTextEntry={true}
          leftIcon={
            <Ionicons name="lock-closed-outline" size={24} color="#e5f4e3" />
          }
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Button
          title="Register"
          onPress={registerUser}
          style={styles.registerButton}
        />
        <Button
          title="Go to Login"
          type="clear"
          size="sm"
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}
        />
      </View>
    </ThemeProvider>
  );
}

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
  container: {
    flex: 1,
    backgroundColor: "#1a2d3d",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
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
  registerButton: {
    marginTop: 10,
    backgroundColor: "#4e937a",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  loginButton: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
