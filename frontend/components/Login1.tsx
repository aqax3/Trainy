import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type LoginType = {
  style?: StyleProp<ViewStyle>;
};

const Login = ({ style }: LoginType) => {
  return (
    <View style={[styles.login, style]}>
      <Text style={[styles.login1, styles.login1Position]}>Login</Text>
      <View style={[styles.selection, styles.login1Position]} />
    </View>
  );
};

const styles = StyleSheet.create({
  login1Position: {
    left: 0,
    position: "absolute",
  },
  login1: {
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
  login: {
    height: 26,
    width: 35,
  },
});

export default Login;
