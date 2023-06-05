import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

const GainWeightContainer = () => {
  return (
    <View style={[styles.frame, styles.frameFlexBox]}>
      <Text style={styles.gainWeightTypo}>Gain Weight</Text>
      <Text style={[styles.loseWeight, styles.getFitterTypo]}>Lose weight</Text>
      <View style={[styles.rectangleParent, styles.frameFlexBox]}>
        <View style={styles.rectangleLayout} />
        <Text style={[styles.getFitter, styles.getFitterTypo]}>Get fitter</Text>
        <View style={[styles.rectangle1, styles.rectangleLayout]} />
      </View>
      <Text style={[styles.gainMoreFlexible, styles.getFitterTypo]}>
        Gain more flexible
      </Text>
      <Text style={[styles.learnTheBasic, styles.gainWeightTypo]}>
        Learn the basic
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  getFitterTypo: {
    color: Color.white,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    textAlign: "center",
  },
  rectangleLayout: {
    height: 3,
    backgroundColor: Color.buttonGreen,
    alignSelf: "stretch",
  },
  gainWeightTypo: {
    textAlign: "center",
    color: Color.dimgray,
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 34,
    fontSize: FontSize.h5Semibold_size,
  },
  loseWeight: {
    marginTop: 10,
    lineHeight: 43,
    fontSize: FontSize.h3Regular_size,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
  },
  getFitter: {
    fontSize: FontSize.h2Semibold_size,
    lineHeight: 30,
    marginTop: 24,
  },
  rectangle1: {
    marginTop: 24,
  },
  rectangleParent: {
    marginTop: 10,
  },
  gainMoreFlexible: {
    marginTop: 10,
    lineHeight: 43,
    fontSize: FontSize.h3Regular_size,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    alignSelf: "stretch",
  },
  learnTheBasic: {
    marginTop: 10,
  },
  frame: {
    overflow: "hidden",
    paddingBottom: Padding.p_187xl,
  },
});

export default GainWeightContainer;
