import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type GroupComponent3Type = {
  style?: StyleProp<ViewStyle>;
};

const GroupComponent3 = ({ style }: GroupComponent3Type) => {
  return (
    <View style={[styles.loginParent, style]}>
      <Text style={styles.login}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: FontSize.footnoteRegular_size,
    lineHeight: 16,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
    textAlign: "left",
  },
  loginParent: {
    width: 35,
    height: 16,
  },
});

export default GroupComponent3;
