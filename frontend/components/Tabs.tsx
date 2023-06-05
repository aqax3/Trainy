import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

type TabsType = {
  style?: StyleProp<ViewStyle>;
};

const Tabs = ({ style }: TabsType) => {
  return (
    <View style={[styles.tabs, style]}>
      <Text style={styles.signUp}>Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPosition: {
    width: 35,
    left: 0,
    position: "absolute",
  },
  signUp: {
    left: 67,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    position: "absolute",
    top: 0,
  },
  tabs: {
    width: 113,
    height: 26,
  },
});

export default Tabs;
