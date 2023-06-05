import * as React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import Rectangle from "./Rectangle";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const Day01WarmUpSection = () => {
  return (
    <View style={styles.cardWithTitleWrapper}>
      <View style={styles.cardWithTitle}>
        <Pressable style={styles.card1}>
          <View style={[styles.card, styles.cardPosition]}>
            <Image
              style={[styles.imageIcon, styles.cardPosition]}
              contentFit="cover"
              source={require("../assets/image5.png")}
            />
            <Rectangle />
          </View>
          <View style={[styles.title, styles.titlePosition]}>
            <Text style={[styles.title1, styles.titleClr]}>
              Day 01 - Warm Up
            </Text>
            <View style={styles.subtitle}>
              <View style={styles.vector} />
              <Text style={[styles.subtitle1, styles.textLinkTypo]}>
                07:00 - 08:00 AM
              </Text>
            </View>
          </View>
          <View style={[styles.proBadge, styles.titlePosition]}>
            <View style={[styles.proBadgeChild, styles.cardPosition]} />
            <Text style={[styles.title2, styles.titleClr]}>PRO</Text>
          </View>
        </Pressable>
        <Text style={[styles.headline, styles.titleClr]}>
          Today Workout Plan
        </Text>
        <Text style={[styles.textLink, styles.textLinkTypo]}>Mon 26 Apr</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardPosition: {
    top: "0%",
    left: "0%",
    position: "absolute",
  },
  titlePosition: {
    bottom: 16,
    position: "absolute",
  },
  titleClr: {
    color: Color.white,
    textAlign: "left",
  },
  textLinkTypo: {
    color: Color.buttonGreen,
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
  },
  imageIcon: {
    borderRadius: Border.br_base,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    height: "100%",
    top: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
  },
  card: {
    height: "100%",
    top: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
  },
  title1: {
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
    alignSelf: "stretch",
  },
  vector: {
    backgroundColor: Color.buttonGreen,
    width: 11,
    height: 2,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
  },
  subtitle1: {
    marginLeft: 5,
    textAlign: "left",
  },
  subtitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  title: {
    left: 16,
    justifyContent: "flex-end",
  },
  proBadgeChild: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.premium,
    height: "100%",
    top: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
  },
  title2: {
    top: "6.25%",
    left: "15.15%",
    fontSize: FontSize.captionRegular_size,
    lineHeight: 13,
    fontWeight: "700",
    fontFamily: FontFamily.captionBold,
    textAlign: "left",
    position: "absolute",
  },
  proBadge: {
    right: 16,
    width: 33,
    height: 16,
    display: "none",
  },
  card1: {
    height: "81.22%",
    top: "18.78%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
    position: "absolute",
  },
  headline: {
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
    top: "0%",
    left: "0%",
    position: "absolute",
  },
  textLink: {
    top: "2.03%",
    left: "78.09%",
    textAlign: "right",
    position: "absolute",
  },
  cardWithTitle: {
    height: 197,
    alignSelf: "stretch",
  },
  cardWithTitleWrapper: {
    top: 150,
    left: 14,
    width: 347,
    padding: Padding.p_3xs,
    position: "absolute",
  },
});

export default Day01WarmUpSection;
