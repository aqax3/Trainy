import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const SpinnerContainer = () => {
  return (
    <View style={styles.spinner}>
      <Text style={styles.text}>36</Text>
      <Text style={[styles.text1, styles.textTypo2]}>35</Text>
      <Text style={[styles.text2, styles.textTypo2]}>37</Text>
      <Text style={[styles.text3, styles.textTypo1]}>34</Text>
      <Text style={[styles.text4, styles.textTypo1]}>38</Text>
      <Text style={[styles.text5, styles.textTypo]}>33</Text>
      <Text style={[styles.text6, styles.textTypo]}>39</Text>
      <View style={[styles.rectangle, styles.rectangleLayout]} />
      <View style={[styles.rectangle1, styles.rectangleLayout]} />
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo2: {
    height: 43,
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 43,
    fontSize: FontSize.size_24xl,
    color: Color.white,
    position: "absolute",
  },
  textTypo1: {
    color: Color.dimgray,
    lineHeight: 34,
    fontSize: FontSize.size_15xl,
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
    position: "absolute",
  },
  textTypo: {
    color: Color.darkslategray_100,
    lineHeight: 27,
    fontSize: FontSize.size_8xl,
    left: 41,
    textAlign: "center",
    fontFamily: FontFamily.bodyRegular,
    position: "absolute",
  },
  rectangleLayout: {
    height: 3,
    backgroundColor: Color.buttonGreen,
    left: 0,
    width: 113,
    position: "absolute",
  },
  text: {
    top: 146,
    left: 19,
    fontSize: FontSize.size_39xl,
    lineHeight: 58,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    textAlign: "left",
    width: 76,
    height: 51,
    color: Color.white,
    position: "absolute",
  },
  text1: {
    top: 79,
    left: 30,
    width: 54,
  },
  text2: {
    top: 228,
    left: 31,
    width: 52,
  },
  text3: {
    top: 34,
    left: 38,
  },
  text4: {
    top: 282,
    left: 37,
  },
  text5: {
    top: 0,
  },
  text6: {
    top: 323,
  },
  rectangle: {
    top: 133,
  },
  rectangle1: {
    top: 214,
  },
  spinner: {
    top: 249,
    left: 131,
    height: 350,
    width: 113,
    position: "absolute",
  },
});

export default SpinnerContainer;
