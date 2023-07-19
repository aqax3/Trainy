import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
  };
  
  type RegistrationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Registration'
  >;
  
  type Props = {
    navigation: RegistrationScreenNavigationProp;
  };
  

export default function RegistrationForm({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
        "http://192.168.1.110:5001/register-user",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setUsername("");
        setEmail("");
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
    <View style={styles.container}>
      <Text>{registrationStatus}</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
      />
      <Button title="Register" onPress={registerUser} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});
