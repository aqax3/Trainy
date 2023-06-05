import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

type Card1Type = {
  style?: StyleProp<ViewStyle>;
};

const Card1 = ({ style }: Card1Type) => {
  return (
    <Pressable style={[styles.card1, style]}>
      <View style={styles.title}>
        <View style={styles.subtitle} />
      </View>
      <Text style={[styles.title1, styles.title1FlexBox]}>Wake Up Call</Text>
      <View style={styles.vector} />
      <Text style={[styles.subtitle1, styles.title1FlexBox]}>
        04 Workouts for Beginner
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title1FlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  subtitle: {
    alignSelf: "stretch",
    height: 16,
  },
  title: {
    bottom: 16,
    left: 16,
    width: 167,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
  },
  title1: {
    width: "41.54%",
    top: "63.75%",
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
    left: "8.08%",
  },
  vector: {
    height: "1.33%",
    width: "3.97%",
    top: "89.06%",
    right: "87.95%",
    bottom: "9.61%",
    backgroundColor: Color.buttonGreen,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    left: "8.08%",
    position: "absolute",
  },
  subtitle1: {
    width: "61.54%",
    top: "80.63%",
    left: "10.77%",
    fontSize: FontSize.footnoteRegular_size,
    lineHeight: 16,
    fontFamily: FontFamily.bodyRegular,
    color: Color.buttonGreen,
  },
  card1: {
    borderRadius: Border.br_base,
    width: 277,
    height: 160,
  },
});

export default Card1;
