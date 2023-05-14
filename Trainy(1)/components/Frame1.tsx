import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Padding } from "../GlobalStyles";

type FrameComponentType = {
  style?: StyleProp<ViewStyle>;
};

const FrameComponent = ({ style }: FrameComponentType) => {
  return (
    <View style={[styles.lineParent, style]}>
      <View style={[styles.componentChild, styles.componentBorder]} />
      <View style={[styles.componentItem, styles.componentBorder]} />
    </View>
  );
};

const styles = StyleSheet.create({
  componentBorder: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  componentChild: {
    width: 13,
  },
  componentItem: {
    width: 22,
    marginTop: 4,
  },
  lineParent: {
    overflow: "hidden",
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_5xs,
  },
});

export default FrameComponent;
