import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import DatePickerContainer from "../components/DatePickerContainer";
import ActivityIndicatorsContainer from "../components/ActivityIndicatorsContainer";
import FinishedWorkoutCard from "../components/FinishedWorkoutCard";
import { Color } from "../GlobalStyles";

const Insight1 = () => {
  return (
    <View style={[styles.insight, styles.insightLayout]}>
      <DatePickerContainer />
      <ActivityIndicatorsContainer />
      <FinishedWorkoutCard />
    </View>
  );
};

const styles = StyleSheet.create({
  insightLayout: {
    overflow: "hidden",
    width: "100%",
  },
  insight: {
    backgroundColor: Color.darkslategray_200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Insight1;
