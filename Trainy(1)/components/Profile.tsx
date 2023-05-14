import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type ProfileIconType = {
  style?: StyleProp<ViewStyle>;
};

const ProfileIcon = ({ style }: ProfileIconType) => {
  return (
    <Image
      style={[styles.profileIcon, style]}
      contentFit="cover"
      source={require("../assets/profile.png")}
    />
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    width: 57,
    height: 57,
  },
});

export default ProfileIcon;
