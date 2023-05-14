import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type ProfileIcon1Type = {
  style?: StyleProp<ViewStyle>;
};

const ProfileIcon1 = ({ style }: ProfileIcon1Type) => {
  return (
    <Image
      style={[styles.profileIcon, style]}
      contentFit="cover"
      source={require("../assets/profile1.png")}
    />
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    width: 57,
    height: 57,
  },
});

export default ProfileIcon1;
