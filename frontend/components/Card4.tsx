import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

type Card4Type = {
  style?: StyleProp<ViewStyle>;
};

const Card4 = ({ style }: Card4Type) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.card4, style]}
      onPress={() => navigation.navigate("WorkoutPlanDetail")}
    >
      <View style={styles.cardPosition}>
        <Image
          style={[styles.imageIcon, styles.imageIconPosition]}
          contentFit="cover"
          source={require("../assets/image5.png")}
        />
        <LinearGradient
          style={[styles.rectangle, styles.imageIconPosition]}
          locations={[0, 1]}
          colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
        />
      </View>
      <View style={[styles.title, styles.titlePosition]}>
        <Text style={[styles.title1, styles.titleClr]}>Drill Essentials</Text>
        <View style={styles.subtitle}>
          <View style={styles.vector} />
          <Text style={styles.subtitle1}>06 Workouts for Beginner</Text>
        </View>
      </View>
      <View style={[styles.proBadge, styles.titlePosition]}>
        <View style={[styles.proBadgeChild, styles.cardPosition]} />
        <Text style={[styles.title2, styles.titleClr]}>PRO</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageIconPosition: {
    borderRadius: Border.br_base,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
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
  cardPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imageIcon: {
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  rectangle: {
    backgroundColor: "transparent",
  },
  title1: {
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.subtitleMedium,
    textAlign: "left",
  },
  vector: {
    backgroundColor: Color.mediumseagreen,
    width: 11,
    height: 2,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
  },
  subtitle1: {
    fontSize: FontSize.size_smi,
    lineHeight: 16,
    fontFamily: FontFamily.bodyRegular,
    color: Color.mediumseagreen,
    textAlign: "left",
  },
  subtitle: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  title: {
    left: 16,
    justifyContent: "flex-end",
  },
  proBadgeChild: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.premium,
  },
  title2: {
    top: "6.25%",
    left: "15.15%",
    fontSize: FontSize.captionRegular_size,
    lineHeight: 13,
    fontWeight: "700",
    fontFamily: FontFamily.openSansBold,
    textAlign: "left",
    position: "absolute",
    color: Color.white,
  },
  proBadge: {
    right: 16,
    width: 33,
    height: 16,
    display: "none",
  },
  card4: {
    width: 260,
    height: 160,
  },
});

export default Card4;
