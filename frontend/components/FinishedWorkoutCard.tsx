import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import CardFinished from "./CardFinished";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const FinishedWorkoutCard = () => {
  return (
    <View style={styles.finishedWorkout}>
      <Text style={styles.headline}>Finished Workout</Text>
      <View style={styles.frame}>
        <CardFinished
          timeDuration="10:00"
          exerciseType="Stability Training"
          exerciseDuration={`{tickSquarechecked}`}
        />
        <CardFinished
          timeDuration="25:00"
          exerciseType="Flash Cycling"
          exerciseDuration={`{tickSquare1checked}`}
          propMarginTop={16}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headline: {
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.subtitleMedium,
    color: Color.white,
    textAlign: "left",
    width: 155,
  },
  frame: {
    overflow: "hidden",
    alignItems: "center",
    marginTop: 14,
    alignSelf: "stretch",
  },
  finishedWorkout: {
    marginTop: 9,
    alignSelf: "stretch",
  },
});

export default FinishedWorkoutCard;
