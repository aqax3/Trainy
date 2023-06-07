import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

import CookieManager from "@react-native-cookies/cookies";

import { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Home: { username: string };
  AddWorkoutScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation?: HomeScreenNavigationProp;
  route?: { params: { username: string } };
};

export default function HomePage({
  navigation
}: Props) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
    })();
  }, []);

  const logoutUser = async () => {
    
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');

    navigation?.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item title="Add Workout" onPress={() => navigation.navigate('AddWorkoutScreen')} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

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
