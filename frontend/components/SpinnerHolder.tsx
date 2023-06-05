import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const SpinnerHolder = () => {
  return (
    <View style={styles.spinner}>
      <View style={styles.spinnerChild} />
      <View style={[styles.spinnerItem, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerInner, styles.spinnerLayout]} />
      <View style={[styles.rectangleView, styles.rectangleViewLayout]} />
      <View style={[styles.spinnerChild1, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild2, styles.spinnerChildLayout7]} />
      <View style={[styles.spinnerChild3, styles.spinnerChildLayout6]} />
      <View style={[styles.spinnerChild4, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild5, styles.spinnerChildLayout5]} />
      <View style={[styles.spinnerChild6, styles.spinnerChildLayout4]} />
      <View style={[styles.spinnerChild7, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild8, styles.spinnerChildLayout3]} />
      <View style={[styles.spinnerChild9, styles.spinnerChildLayout2]} />
      <View style={[styles.spinnerChild10, styles.spinnerChildLayout1]} />
      <View style={[styles.spinnerChild11, styles.spinnerChildLayout]} />
      <View style={[styles.spinnerChild12, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild13, styles.spinnerLayout]} />
      <View style={[styles.spinnerChild14, styles.rectangleViewLayout]} />
      <View style={[styles.spinnerChild15, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild16, styles.spinnerChildLayout7]} />
      <View style={[styles.spinnerChild17, styles.spinnerChildLayout6]} />
      <View style={[styles.spinnerChild18, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild19, styles.spinnerChildLayout5]} />
      <View style={[styles.spinnerChild20, styles.spinnerChildLayout4]} />
      <View style={[styles.spinnerChild21, styles.spinnerChildLayout8]} />
      <View style={[styles.spinnerChild22, styles.spinnerChildLayout3]} />
      <View style={[styles.spinnerChild23, styles.spinnerChildLayout2]} />
      <View style={[styles.spinnerChild24, styles.spinnerChildLayout1]} />
      <View style={[styles.spinnerChild25, styles.spinnerChildLayout]} />
      <Text style={[styles.kg, styles.kgClr]}>kg</Text>
      <Text style={[styles.text, styles.kgClr]}>54</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerChildLayout8: {
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerLayout: {
    opacity: 0.9,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  rectangleViewLayout: {
    opacity: 0.4,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout7: {
    opacity: 0.8,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout6: {
    opacity: 0.3,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout5: {
    opacity: 0.7,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout4: {
    opacity: 0.2,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout3: {
    opacity: 0.6,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout2: {
    opacity: 0.1,
    width: 29,
    top: 152,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout1: {
    width: 49,
    top: 156,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerChildLayout: {
    opacity: 0.5,
    width: 49,
    top: 156,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  kgClr: {
    color: Color.white,
    position: "absolute",
  },
  spinnerChild: {
    top: 166,
    left: 181,
    width: 92,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 3,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  spinnerItem: {
    left: 194,
  },
  spinnerInner: {
    left: 258,
  },
  rectangleView: {
    left: 323,
  },
  spinnerChild1: {
    left: 207,
  },
  spinnerChild2: {
    left: 271,
  },
  spinnerChild3: {
    left: 336,
  },
  spinnerChild4: {
    left: 220,
  },
  spinnerChild5: {
    left: 284,
  },
  spinnerChild6: {
    left: 349,
  },
  spinnerChild7: {
    left: 233,
  },
  spinnerChild8: {
    left: 297,
  },
  spinnerChild9: {
    left: 362,
  },
  spinnerChild10: {
    left: 246,
  },
  spinnerChild11: {
    left: 310,
  },
  spinnerChild12: {
    left: 171,
  },
  spinnerChild13: {
    left: 107,
  },
  spinnerChild14: {
    left: 42,
  },
  spinnerChild15: {
    left: 158,
  },
  spinnerChild16: {
    left: 94,
  },
  spinnerChild17: {
    left: 29,
  },
  spinnerChild18: {
    left: 145,
  },
  spinnerChild19: {
    left: 81,
  },
  spinnerChild20: {
    left: 16,
  },
  spinnerChild21: {
    left: 132,
  },
  spinnerChild22: {
    left: 68,
  },
  spinnerChild23: {
    left: 3,
  },
  spinnerChild24: {
    left: 119,
  },
  spinnerChild25: {
    left: 55,
  },
  kg: {
    top: 34,
    left: 224,
    fontSize: FontSize.subtitleMedium_size,
    fontFamily: FontFamily.bodyRegular,
    textAlign: "center",
  },
  text: {
    top: 0,
    left: 141,
    fontSize: FontSize.size_45xl,
    lineHeight: 64,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    textAlign: "left",
  },
  spinner: {
    top: 319,
    left: 5,
    width: 365,
    height: 166,
    position: "absolute",
  },
});

export default SpinnerHolder;
