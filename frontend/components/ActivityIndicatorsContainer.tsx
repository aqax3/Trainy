import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ActivityIndicatorsContainer = () => {
  const [
    activeCaloriesActivityIndicatorAnimating,
    setActiveCaloriesActivityIndicatorAnimating,
  ] = useState(true);
  const [stepsActivityIndicatorAnimating, setStepsActivityIndicatorAnimating] =
    useState(true);
  const [timeActivityIndicatorAnimating, setTimeActivityIndicatorAnimating] =
    useState(true);
  const [heartActivityIndicatorAnimating, setHeartActivityIndicatorAnimating] =
    useState(true);

  return (
    <View style={[styles.graphics, styles.graphicsFlexBox]}>
      <ActivityIndicator
        style={styles.activeCalories}
        size="small"
        color="#939393"
        animating={activeCaloriesActivityIndicatorAnimating}
      />
      <View style={[styles.stepsParent, styles.graphicsFlexBox]}>
        <ActivityIndicator
          style={styles.steps}
          size="small"
          color="#939393"
          animating={stepsActivityIndicatorAnimating}
        />
        <ActivityIndicator
          style={styles.steps}
          size="small"
          color="#939393"
          animating={timeActivityIndicatorAnimating}
        />
        <ActivityIndicator
          style={styles.heart}
          size="small"
          color="#939393"
          animating={heartActivityIndicatorAnimating}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graphicsFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  activeCalories: {
    width: 168,
    height: 168,
  },
  steps: {
    width: 93,
    height: 93,
  },
  heart: {
    width: 101,
    height: 93,
  },
  stepsParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  graphics: {
    marginTop: 9,
  },
});

export default ActivityIndicatorsContainer;
