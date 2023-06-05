import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import DateSelectorContainer from "../components/DateSelectorContainer";
import GraphicsContainer from "../components/GraphicsContainer";
import FinishedWorkoutCard from "../components/FinishedWorkoutCard";
import { Color } from "../GlobalStyles";

const Insight = () => {
  return (
    <View style={[styles.insight, styles.insightLayout]}>
      <DateSelectorContainer />
      <GraphicsContainer />
      <FinishedWorkoutCard />
    </View>
  );
};

const styles = StyleSheet.create({
  insightLayout: {
    overflow: "hidden",
    width: "100%",
  },
  navigationBarIcon: {
    alignSelf: "stretch",
    maxWidth: "100%",
    height: 92,
    marginTop: 9,
  },
  insight: {
    backgroundColor: Color.bg,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Insight;
