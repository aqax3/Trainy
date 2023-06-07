import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

type ExerciseCardType = {
  exerciseTitle?: string;
  exerciseDescription?: ImageSourcePropType;

  /** Style props */
  propTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const ExerciseCard = ({
  exerciseTitle,
  exerciseDescription,
  propTop,
}: ExerciseCardType) => {
  const smallCardStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.smallCard, smallCardStyle]}
      onPress={() => navigation.navigate("Video")}
    >
      <View style={[styles.rectangle, styles.rectanglePosition]} />
      <Text style={[styles.title, styles.titlePosition]}>{exerciseTitle}</Text>
      <Image
        style={[styles.imageIcon, styles.iconPosition]}
        contentFit="cover"
        source={exerciseDescription}
      />
      <Image
        style={[styles.downIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/down.png")}
      />
      <Text style={[styles.title1, styles.titlePosition]}>0:30</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rectanglePosition: {
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  titlePosition: {
    textAlign: "left",
    left: "30.23%",
    position: "absolute",
  },
  iconPosition: {
    overflow: "hidden",
    position: "absolute",
  },
  rectangle: {
    width: "100%",
    right: "0%",
    borderRadius: Border.br_xs,
    backgroundColor: Color.gray,
    position: "absolute",
  },
  title: {
    height: "47.37%",
    width: "47.27%",
    top: "13.16%",
    fontSize: FontSize.bodyRegular_size,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.subtitleMedium,
    color: Color.white,
  },
  imageIcon: {
    width: "25.08%",
    right: "74.92%",
    maxWidth: "100%",
    maxHeight: "100%",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  downIcon: {
    top: 26,
    right: 16,
    width: 24,
    height: 24,
  },
  title1: {
    width: "18.01%",
    top: "65.79%",
    fontSize: FontSize.size_smi,
    lineHeight: 16,
    fontFamily: FontFamily.bodyRegular,
    color: Color.mediumseagreen,
  },
  smallCard: {
    top: 588,
    left: 24,
    width: 327,
    height: 76,
    position: "absolute",
  },
});

export default ExerciseCard;
