import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavigationRegLog from "./components/NavigationRegLog/NavigationRegLog";
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';



export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();  // prevent the auto hiding of splash screen

        await Font.loadAsync({
          ...MaterialIcons.font,
        });

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
      <NavigationRegLog />
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
