import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type PlayIcon1Type = {
  style?: StyleProp<ViewStyle>;
};

const PlayIcon1 = ({ style }: PlayIcon1Type) => {
  return (
    <Image
      style={[styles.playIcon, style]}
      contentFit="cover"
      source={require("../assets/play1.png")}
    />
  );
};

const styles = StyleSheet.create({
  playIcon: {
    width: 60,
    height: 57,
  },
});

export default PlayIcon1;
