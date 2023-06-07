import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

type BeginnerWorkoutContainerType = {
  workoutTitle?: ImageSourcePropType;
  workoutSubtitle?: string;
  workoutNumber?: string;

  /** Style props */
  propMarginTop?: number | string;
  propWidth?: number | string;
  propAlignSelf?: string;
  propBackgroundColor?: string;
  propColor?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const BeginnerWorkoutContainer = ({
  workoutTitle,
  workoutSubtitle,
  workoutNumber,
  propMarginTop,
  propWidth,
  propAlignSelf,
  propBackgroundColor,
  propColor,
}: BeginnerWorkoutContainerType) => {
  const card1Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  const titleStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth),
    };
  }, [propWidth]);

  const title1Style = useMemo(() => {
    return {
      ...getStyleValue("alignSelf", propAlignSelf),
    };
  }, [propAlignSelf]);

  const vectorStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
    };
  }, [propBackgroundColor]);

  const subtitleStyle = useMemo(() => {
    return {
      ...getStyleValue("color", propColor),
    };
  }, [propColor]);

  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.card1, card1Style]}
      onPress={() => navigation.navigate("WorkoutPlanDetail")}
    >
      <View style={styles.card}>
        <Image
          style={[styles.imageIcon, styles.imageIconLayout]}
          contentFit="cover"
          source={workoutTitle}
        />
        <LinearGradient
          style={[styles.rectangle, styles.imageIconLayout]}
          locations={[0, 1]}
          colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
        />
      </View>
      <View style={[styles.title, titleStyle]}>
        <Text style={[styles.title1, title1Style]}>{workoutSubtitle}</Text>
        <View style={styles.subtitle}>
          <View style={[styles.vector, vectorStyle]} />
          <Text style={[styles.subtitle1, subtitleStyle]}>{workoutNumber}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageIconLayout: {
    borderRadius: Border.br_base,
    height: 160,
    alignSelf: "stretch",
  },
  imageIcon: {
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  rectangle: {
    backgroundColor: "transparent",
    marginTop: -160,
  },
  card: {
    top: 0,
    left: 0,
    width: 327,
    alignItems: "center",
    position: "absolute",
  },
  title1: {
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.subtitleMedium,
    color: Color.white,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    alignItems: "center",
    alignSelf: "stretch",
  },
  title: {
    bottom: 16,
    left: 16,
    justifyContent: "flex-end",
    position: "absolute",
  },
  card1: {
    height: 160,
    alignSelf: "stretch",
  },
});

export default BeginnerWorkoutContainer;
