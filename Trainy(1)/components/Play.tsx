import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type PlayIconType = {
  style?: StyleProp<ViewStyle>;
};

const PlayIcon = ({ style }: PlayIconType) => {
  return (
    <Image
      style={[styles.playIcon, style]}
      contentFit="cover"
      source={require("../assets/play.png")}
    />
  );
};

const styles = StyleSheet.create({
  playIcon: {
    width: 60,
    height: 57,
  },
});

export default PlayIcon;
