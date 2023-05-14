import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

import CookieManager from "@react-native-cookies/cookies";

type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Home: { username: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation?: HomeScreenNavigationProp;
  route?: { params: { username: string } };
};

export default function HomePage({
  navigation,
  route = { params: { username: "" } },
}: Props) {
  const { username } = route.params;

  const logoutUser = async () => {
    
    await AsyncStorage.removeItem('userToken');

    navigation?.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {username}</Text>
      <Button title="Logout" onPress={logoutUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
