import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type HomeIconType = {
  style?: StyleProp<ViewStyle>;
};

const HomeIcon = ({ style }: HomeIconType) => {
  return (
    <Image
      style={[styles.homeIcon, style]}
      contentFit="cover"
      source={require("../assets/home1.png")}
    />
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    width: 57,
    height: 57,
  },
});

export default HomeIcon;
