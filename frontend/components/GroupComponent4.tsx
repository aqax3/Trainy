import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type GroupComponent4Type = {
  style?: StyleProp<ViewStyle>;
};

const GroupComponent4 = ({ style }: GroupComponent4Type) => {
  return (
    <View style={[styles.signUpParent, style]}>
      <Text style={[styles.signUp, styles.signUpPosition]}>Sign up</Text>
      <View style={[styles.selection, styles.signUpPosition]} />
    </View>
  );
};

const styles = StyleSheet.create({
  signUpPosition: {
    left: 0,
    position: "absolute",
  },
  signUp: {
    top: 0,
    fontSize: FontSize.footnoteRegular_size,
    lineHeight: 16,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
    textAlign: "left",
  },
  selection: {
    top: 23,
    backgroundColor: Color.buttonGreen,
    height: 3,
    width: 47,
  },
  signUpParent: {
    height: 26,
    width: 47,
  },
});

export default GroupComponent4;
