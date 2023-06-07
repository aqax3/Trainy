import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type HomeIcon1Type = {
  style?: StyleProp<ViewStyle>;
};

const HomeIcon1 = ({ style }: HomeIcon1Type) => {
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
    width: 24,
    height: 24,
  },
});

export default HomeIcon1;
