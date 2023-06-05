import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";

const ContainerFrame = () => {
  return (
    <View style={styles.frame}>
      <View style={styles.groupParent}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../assets/group-12.png")}
        />
        <View style={styles.info}>
          <Text style={styles.joined}>Joined</Text>
          <Text style={styles.headline}>2 month ago</Text>
        </View>
      </View>
      <View style={styles.name}>
        <Text style={[styles.sarah, styles.sarahTypo]}>Sarah</Text>
        <Text style={styles.sarahTypo}>Wegan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sarahTypo: {
    fontFamily: FontFamily.roboto,
    lineHeight: 43,
    fontSize: FontSize.size_13xl,
    color: Color.white,
    textAlign: "left",
    alignSelf: "stretch",
  },
  frameChild: {
    width: 106,
    height: 106,
  },
  joined: {
    fontSize: FontSize.captionRegular_size,
    lineHeight: 13,
    fontFamily: FontFamily.bodyRegular,
    color: Color.dimgray,
    textAlign: "left",
  },
  headline: {
    fontSize: FontSize.bodyMedium_size,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    marginTop: 4,
    color: Color.white,
    textAlign: "left",
  },
  info: {
    width: 116,
    height: 104,
    paddingLeft: Padding.p_5xl,
    paddingTop: Padding.p_15xl,
    paddingBottom: Padding.p_15xl,
  },
  groupParent: {
    flexDirection: "row",
    paddingBottom: Padding.p_10xs_5,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  sarah: {
    fontWeight: "700",
  },
  name: {
    width: 130,
    justifyContent: "flex-end",
    marginTop: 6,
  },
  frame: {
    overflow: "hidden",
    alignSelf: "stretch",
  },
});

export default ContainerFrame;
