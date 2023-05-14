import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type StatsIconType = {
  style?: StyleProp<ViewStyle>;
};

const StatsIcon = ({ style }: StatsIconType) => {
  return (
    <Image
      style={[styles.statsIcon, style]}
      contentFit="cover"
      source={require("../assets/stats.png")}
    />
  );
};

const styles = StyleSheet.create({
  statsIcon: {
    width: 60,
    height: 57,
  },
});

export default StatsIcon;
