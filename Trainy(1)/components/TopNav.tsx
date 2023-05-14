import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

type TopNavType = {
  style?: StyleProp<ViewStyle>;
};

const TopNav = ({ style }: TopNavType) => {
  return (
    <View style={[styles.topNav, style]}>
      <Image
        style={[styles.cogwheel1Icon, styles.trainyPosition]}
        contentFit="cover"
        source={require("../assets/cogwheel-1.png")}
      />
      <Text style={[styles.trainy, styles.trainyPosition]}>TRAINY</Text>
      <View style={[styles.rectangleParent, styles.groupChildPosition]}>
        <View style={[styles.groupChild, styles.groupChildPosition]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trainyPosition: {
    top: 0,
    position: "absolute",
  },
  groupChildPosition: {
    width: 43,
    top: 1,
    left: 0,
    position: "absolute",
  },
  componentBorder: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  cogwheel1Icon: {
    left: 373,
    width: 21,
    height: 20,
  },
  trainy: {
    left: 153,
    fontSize: FontSize.size_xl,
    letterSpacing: -0.8,
    fontFamily: FontFamily.roboto,
    color: Color.white,
    textAlign: "left",
    width: 82,
    height: 22,
  },
  groupChild: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.maroon,
    height: 18,
  },
  rectangleParent: {
    height: 20,
  },
  topNav: {
    width: 394,
    height: 22,
  },
});

export default TopNav;
