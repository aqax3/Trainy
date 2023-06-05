import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type GroupComponentType = {
  style?: StyleProp<ViewStyle>;
};

const GroupComponent = ({ style }: GroupComponentType) => {
  return (
    <View style={[styles.loginParent, style]}>
      <Text style={[styles.login, styles.loginPosition]}>Login</Text>
      <View style={[styles.selection, styles.loginPosition]} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginPosition: {
    left: 0,
    position: "absolute",
  },
  login: {
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
    width: 35,
  },
  loginParent: {
    height: 26,
    width: 35,
  },
});

export default GroupComponent;
