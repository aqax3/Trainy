import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type StatsIcon1Type = {
  style?: StyleProp<ViewStyle>;
};

const StatsIcon1 = ({ style }: StatsIcon1Type) => {
  return (
    <Image
      style={[styles.statsIcon, style]}
      contentFit="cover"
      source={require("../assets/stats1.png")}
    />
  );
};

const styles = StyleSheet.create({
  statsIcon: {
    width: 60,
    height: 57,
  },
});

export default StatsIcon1;
