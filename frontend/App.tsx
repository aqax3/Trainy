import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import NavigationRegLog from "./components/NavigationRegLog/NavigationRegLog";

export default function App() {

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
