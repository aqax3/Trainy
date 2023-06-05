import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

type GroupComponent1Type = {
  style?: StyleProp<ViewStyle>;
};

const GroupComponent1 = ({ style }: GroupComponent1Type) => {
  return (
    <View style={[styles.signUpParent, style]}>
      <Text style={styles.signUp}>Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signUp: {
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
  signUpParent: {
    width: 46,
    height: 16,
  },
});

export default GroupComponent1;
