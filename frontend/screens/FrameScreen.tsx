import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const FrameScreen = () => {
  const [frameTextInput, setFrameTextInput] = useState("Email");

  return (
    <View style={styles.forgotPasswordParent}>
      <View style={styles.forgotPassword}>
        <View style={styles.tryAnotherWayParent}>
          <Text style={styles.tryAnotherWay}>Try another way</Text>
          <Pressable style={styles.defaultButton}>
            <View style={styles.rectangle} />
            <Text style={styles.buttonText}>Send</Text>
          </Pressable>
        </View>
        <TextInput
          style={[styles.forgotPasswordChild, styles.textPosition]}
          placeholder="Email"
          keyboardType="default"
          value={frameTextInput}
          onChangeText={setFrameTextInput}
          placeholderTextColor="#fff"
        />
        <View style={[styles.text, styles.textPosition]}>
          <Text style={[styles.forgotPassword1, styles.forgotPassword1Typo]}>
            Forgot Password?
          </Text>
          <Text
            style={[styles.enterYourInformations, styles.forgotPassword1Typo]}
          >{`Enter your informations below or
login with a other account`}</Text>
        </View>
        <Pressable style={styles.nav}>
          <Image
            style={styles.circleLeftIcon}
            contentFit="cover"
            source={require("../assets/circle-left1.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    left: 32,
    position: "absolute",
  },
  forgotPassword1Typo: {
    color: Color.white,
    fontFamily: FontFamily.roboto,
    textAlign: "left",
  },
  tryAnotherWay: {
    fontSize: FontSize.footnoteRegular_size,
    color: Color.buttonGreen,
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    lineHeight: 16,
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_5xl,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
    width: "100%",
  },
  buttonText: {
    marginTop: -11,
    marginLeft: -20.5,
    top: "50%",
    left: "50%",
    color: Color.black,
    textAlign: "center",
    fontSize: FontSize.subtitleMedium_size,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    position: "absolute",
  },
  defaultButton: {
    height: 50,
    marginTop: 32,
    alignSelf: "stretch",
  },
  tryAnotherWayParent: {
    top: 379,
    left: 120,
    alignItems: "center",
    position: "absolute",
  },
  forgotPasswordChild: {
    top: 222,
    width: 311,
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.subtitleMedium_size,
  },
  forgotPassword1: {
    fontSize: FontSize.h3Regular_size,
    lineHeight: 30,
    fontWeight: "700",
    width: 207,
  },
  enterYourInformations: {
    fontSize: FontSize.size_3xs,
    marginTop: 16,
    alignSelf: "stretch",
    lineHeight: 16,
    color: Color.white,
    fontFamily: FontFamily.roboto,
  },
  text: {
    top: 114,
  },
  circleLeftIcon: {
    width: 32,
    height: 32,
  },
  nav: {
    top: 56,
    left: 24,
    position: "absolute",
    flexDirection: "row",
  },
  forgotPassword: {
    backgroundColor: Color.bg,
    height: 812,
    overflow: "hidden",
    flex: 1,
  },
  forgotPasswordParent: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
});

export default FrameScreen;
