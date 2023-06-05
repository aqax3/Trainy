import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontFamily, Color, FontSize, Padding } from "../GlobalStyles";

const Container165 = () => {
  return (
    <View style={styles.parent}>
      <Text style={[styles.text, styles.cmTypo]}>164</Text>
      <Text style={[styles.text1, styles.textTypo]}>165</Text>
      <Text style={styles.text2}>166</Text>
      <View style={styles.frameWrapper}>
        <View style={styles.frame}>
          <View style={styles.rectangleLayout} />
          <View style={[styles.rectangle1, styles.rectangleLayout]} />
          <View style={styles.group}>
            <Text style={[styles.text3, styles.cmFlexBox]}>167</Text>
            <Text style={[styles.cm, styles.cmFlexBox]}>cm</Text>
          </View>
        </View>
      </View>
      <Text style={styles.text2}>168</Text>
      <Text style={[styles.text1, styles.textTypo]}>169</Text>
      <Text style={[styles.text6, styles.textTypo]}>170</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cmTypo: {
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
  },
  textTypo: {
    marginTop: 11,
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
  },
  rectangleLayout: {
    height: 3,
    backgroundColor: Color.buttonGreen,
    alignSelf: "stretch",
  },
  cmFlexBox: {
    flex: 1,
    color: Color.white,
  },
  text: {
    color: Color.darkslategray_100,
    lineHeight: 27,
    fontSize: FontSize.size_8xl,
  },
  text1: {
    fontSize: FontSize.size_15xl,
    lineHeight: 34,
    color: Color.dimgray,
  },
  text2: {
    fontSize: FontSize.size_24xl,
    lineHeight: 43,
    color: Color.white,
    marginTop: 11,
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
  },
  rectangle1: {
    marginTop: 78,
  },
  text3: {
    fontSize: FontSize.size_39xl,
    lineHeight: 58,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    textAlign: "left",
  },
  cm: {
    fontSize: FontSize.subtitleMedium_size,
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
  },
  group: {
    width: 205,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_2xs,
    justifyContent: "center",
    marginTop: 78,
    flexDirection: "row",
  },
  frame: {
    width: 163,
    overflow: "hidden",
    alignItems: "center",
  },
  frameWrapper: {
    height: 84,
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 11,
    alignItems: "center",
  },
  text6: {
    color: Color.darkslategray_100,
    lineHeight: 27,
    fontSize: FontSize.size_8xl,
  },
  parent: {
    position: "absolute",
    top: 0,
    left: -78,
    width: 241,
    alignItems: "center",
  },
});

export default Container165;
