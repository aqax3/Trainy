import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type ProfilePictureIcon1Type = {
  style?: StyleProp<ViewStyle>;
};

const ProfilePictureIcon1 = ({ style }: ProfilePictureIcon1Type) => {
  return (
    <Image
      style={[styles.profilePictureIcon, style]}
      contentFit="cover"
      source={require("../assets/profile-picture.png")}
    />
  );
};

const styles = StyleSheet.create({
  profilePictureIcon: {
    width: 42,
    height: 42,
  },
});

export default ProfilePictureIcon1;
