import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Color, Border } from "../GlobalStyles";

type Insight2Type = {
  style?: StyleProp<ViewStyle>;
};

const Insight2 = ({ style }: Insight2Type) => {
  return <View style={[styles.insight, style]} />;
};

const styles = StyleSheet.create({
  groupItemPosition: {
    top: 0,
    height: 22,
  },
  groupLayout: {
    width: 5,
    backgroundColor: Color.white,
    borderRadius: Border.br_5xl,
    position: "absolute",
  },
  insight: {
    width: 24,
    height: 24,
  },
});

export default Insight2;
