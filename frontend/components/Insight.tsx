import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import { Color, Border } from "../GlobalStyles";

type InsightType = {
  style?: StyleProp<ViewStyle>;
};

const Insight = ({ style }: InsightType) => {
  return (
    <View style={[styles.insight, style]}>
      <View style={styles.insightInner}>
        <View style={[styles.rectangleParent, styles.groupItemPosition]}>
          <View style={[styles.groupChild, styles.groupLayout]} />
          <View style={[styles.groupItem, styles.groupLayout]} />
          <View style={[styles.groupInner, styles.groupLayout]} />
        </View>
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
    backgroundColor: Color.dimgray,
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
    width: 21,
    position: "absolute",
    top: 0,
  },
  insightInner: {
    top: 1,
    left: 2,
    height: 22,
    width: 21,
    position: "absolute",
  },
  insight: {
    width: 24,
    height: 24,
  },
});

export default Insight;
