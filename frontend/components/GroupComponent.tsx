import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Color, Border } from "../GlobalStyles";

type GroupComponentType = {
  style?: StyleProp<ViewStyle>;
};

const GroupComponent = ({ style }: GroupComponentType) => {
  return (
    <View style={[styles.groupParent, style]}>
      <View style={[styles.rectangleParent, styles.groupItemPosition]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <View style={[styles.groupItem, styles.groupLayout]} />
        <View style={[styles.groupInner, styles.groupLayout]} />
      </View>
    </View>
  );
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
  groupChild: {
    top: 11,
    height: 11,
    left: 0,
  },
  groupItem: {
    left: 8,
    top: 0,
    height: 22,
  },
  groupInner: {
    top: 6,
    left: 16,
    height: 16,
  },
  rectangleParent: {
    left: 0,
    position: "absolute",
    top: 0,
    width: 21,
  },
  groupParent: {
    height: 22,
    width: 21,
  },
});

export default GroupComponent;
