import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import SpinnerHolder from "../components/SpinnerHolder";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const Weight = () => {
  return (
    <View style={styles.weight}>
      <View style={[styles.buttons, styles.buttonsLayout]}>
        <View style={styles.smallButton}>
          <View style={styles.signUpParent}>
            <Text style={styles.signUp}>Next</Text>
            <Image
              style={styles.chevronRightIcon}
              contentFit="cover"
              source={require("../assets/chevronright.png")}
            />
          </View>
        </View>
        <Image
          style={[styles.backButtonIcon, styles.backButtonIconPosition]}
          contentFit="cover"
          source={require("../assets/back-button.png")}
        />
      </View>
      <SpinnerHolder />
      <View style={styles.text}>
        <Text
          style={[styles.youCanAlways, styles.youCanAlwaysTypo]}
        >{`You can always change this later  `}</Text>
        <Text style={[styles.whatsYourWeight, styles.youCanAlwaysTypo]}>
          What’s your weight?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsLayout: {
    height: 54,
    position: "absolute",
  },
  backButtonIconPosition: {
    left: 0,
    top: 0,
  },
  youCanAlwaysTypo: {
    color: Color.white,
    fontFamily: FontFamily.roboto,
    textAlign: "center",
    position: "absolute",
  },
  signUp: {
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.black,
    textAlign: "center",
  },
  chevronRightIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    overflow: "hidden",
  },
  signUpParent: {
    flexDirection: "row",
  },
  smallButton: {
    top: 2,
    left: 192,
    borderRadius: Border.br_29xl,
    backgroundColor: Color.buttonGreen,
    paddingLeft: Padding.p_9xl,
    paddingTop: Padding.p_smi,
    paddingRight: Padding.p_xl,
    paddingBottom: Padding.p_smi,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
  },
  backButtonIcon: {
    width: 54,
    height: 54,
    position: "absolute",
  },
  buttons: {
    top: 714,
    left: 32,
    width: 312,
  },
  youCanAlways: {
    top: 42,
    left: 29,
    fontSize: FontSize.size_3xs,
    lineHeight: 16,
  },
  whatsYourWeight: {
    fontSize: FontSize.h5Semibold_size,
    lineHeight: 30,
    fontWeight: "700",
    left: 0,
    top: 0,
  },
  text: {
    top: 80,
    left: 56,
    width: 262,
    height: 58,
    position: "absolute",
  },
  weight: {
    backgroundColor: Color.bg,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default Weight;
