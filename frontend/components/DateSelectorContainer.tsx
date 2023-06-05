import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const DateSelectorContainer = () => {
  return (
    <View style={styles.datePicker}>
      <Image
        style={styles.rectangleIcon}
        contentFit="cover"
        source={require("../assets/rectangle3.png")}
      />
      <Image
        style={[styles.circleRightIcon, styles.circleIconLayout]}
        contentFit="cover"
        source={require("../assets/circle-right.png")}
      />
      <Image
        style={[styles.circleLeftIcon, styles.circleIconLayout]}
        contentFit="cover"
        source={require("../assets/circle-left2.png")}
      />
      <View style={styles.days}>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle, styles.rectanglePosition]} />
          <Text style={[styles.day1, styles.day1FlexBox]}>M</Text>
          <Text style={[styles.number, styles.numberTypo]}>16</Text>
        </Pressable>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle, styles.rectanglePosition]} />
          <Text style={[styles.day1, styles.day1FlexBox]}>T</Text>
          <Text style={[styles.number, styles.numberTypo]}>17</Text>
        </Pressable>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle2, styles.rectanglePosition]} />
          <Text style={[styles.day5, styles.day5Clr]}>W</Text>
          <Text style={[styles.number2, styles.day5Clr]}>18</Text>
        </Pressable>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle, styles.rectanglePosition]} />
          <Text style={[styles.day1, styles.day1FlexBox]}>T</Text>
          <Text style={[styles.number, styles.numberTypo]}>19</Text>
        </Pressable>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle, styles.rectanglePosition]} />
          <Text style={[styles.day1, styles.day1FlexBox]}>F</Text>
          <Text style={[styles.number, styles.numberTypo]}>20</Text>
        </Pressable>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle, styles.rectanglePosition]} />
          <Text style={[styles.day1, styles.day1FlexBox]}>S</Text>
          <Text style={[styles.number, styles.numberTypo]}>21</Text>
        </Pressable>
        <Pressable style={styles.day}>
          <View style={[styles.rectangle, styles.rectanglePosition]} />
          <Text style={[styles.day1, styles.day1FlexBox]}>S</Text>
          <Text style={[styles.number, styles.numberTypo]}>22</Text>
        </Pressable>
      </View>
      <Text style={[styles.date, styles.numberTypo]}>October 2021</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circleIconLayout: {
    height: 26,
    width: 26,
    top: 60,
    position: "absolute",
  },
  rectanglePosition: {
    borderRadius: Border.br_5xl,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  day1FlexBox: {
    textAlign: "center",
    color: Color.white,
    position: "absolute",
  },
  numberTypo: {
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
  },
  day5Clr: {
    color: Color.black,
    textAlign: "center",
    position: "absolute",
  },
  rectangleIcon: {
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  circleRightIcon: {
    right: 24,
  },
  circleLeftIcon: {
    right: 325,
  },
  rectangle: {
    backgroundColor: Color.darkslategray_100,
  },
  day1: {
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    left: "32.5%",
    top: "17.86%",
    width: "33.33%",
    height: "28.57%",
  },
  number: {
    left: "22.5%",
    top: "50%",
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    textAlign: "center",
    color: Color.white,
    position: "absolute",
  },
  day: {
    width: 40,
    height: 64,
  },
  rectangle2: {
    backgroundColor: Color.buttonGreen,
  },
  day5: {
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    left: "32.5%",
    top: "17.86%",
    width: "33.33%",
    height: "28.57%",
  },
  number2: {
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    left: "22.5%",
    top: "50%",
  },
  days: {
    top: 115,
    left: 24,
    width: 364,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
  },
  date: {
    width: "29.33%",
    top: "31.03%",
    left: "35.2%",
    textAlign: "left",
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
    position: "absolute",
  },
  datePicker: {
    alignSelf: "stretch",
    height: 203,
  },
});

export default DateSelectorContainer;
