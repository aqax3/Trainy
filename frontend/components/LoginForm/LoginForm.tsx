import { StyleSheet, Text, TextInput } from "react-native";
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
    Home: {username: string};
  };
  
  type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  
  type Props = {
    navigation: LoginScreenNavigationProp;
  };

export default function LoginForm({navigation}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.104:5001/login-user",
        {
          username,
          password,
        }
      );

      console.log(response.data);
      setUsername("");
      setPassword("");
      setLoginStatus("Login successful!");

      console.log(response.data.userToken);

      await AsyncStorage.setItem('userToken', response.data.userToken);
      await AsyncStorage.setItem('username', response.data.user.username);

      navigation.navigate('Home', {username: response.data.user.username});
    } catch (error) {
      console.error(error);
      setLoginStatus("Login failed!");
    }
  };

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
