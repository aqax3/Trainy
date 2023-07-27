import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavigationStack from "./components/NavigationStack/NavigationStack";
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();  // prevent the auto hiding of splash screen

        await Font.loadAsync({
          ...MaterialIcons.font,
        });

        const userToken = await AsyncStorage.getItem("userToken");
        setInitialRoute(userToken ? "Home" : "Login");

        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();  // hide the splash screen
      }
    };

    prepare();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavigationStack initialRouteName={initialRoute}/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
