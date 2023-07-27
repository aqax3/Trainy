import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { Button, lightColors, createTheme, ThemeProvider, Input, Icon } from '@rneui/themed';
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Register: undefined;
    Login: undefined;
  };
  
  type RegistrationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Register'
  >;
  
  type Props = {
    navigation: RegistrationScreenNavigationProp;
  };
  

export default function RegistrationForm({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setRegistrationStatus("Passwords do not match!");
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

        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
      setRegistrationStatus("Registration failed!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Text>{registrationStatus}</Text>
      <Input
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
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
        placeholder="Enter password"
        secureTextEntry={true}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color='black' 
          />
        }
      />
      <Input
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color='black' 
          />
        }
      />
      <Button title="Register" onPress={registerUser} />
      <Button title="Go to Login" type="clear" size="sm" onPress={() => navigation.navigate('Login')} />
    </ThemeProvider>
  );
}

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
})

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
