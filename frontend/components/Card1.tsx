import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

type Card1Type = {
  style?: StyleProp<ViewStyle>;
};

const Card1 = ({ style }: Card1Type) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.card1, style]}
      onPress={() => navigation.navigate("WorkoutPlanDetail")}
    >
      <ImageBackground style={styles.icon}>
        <View style={[styles.title, styles.titlePosition]}>
          <View style={styles.subtitle} />
        </View>
        <Text style={[styles.title1, styles.title1FlexBox]}>Wake Up Call</Text>
        <View style={[styles.vector, styles.titlePosition]} />
        <Text style={[styles.subtitle1, styles.title1FlexBox]}>
          04 Workouts for Beginner
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titlePosition: {
    opacity: 0,
    position: "absolute",
  },
  title1FlexBox: {
    textAlign: "left",
    opacity: 0,
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
  },
  title1: {
    width: "41.54%",
    top: "63.75%",
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.subtitleMedium,
    color: Color.white,
    left: "8.08%",
  },
  vector: {
    height: "1.33%",
    width: "3.97%",
    top: "89.06%",
    right: "87.95%",
    bottom: "9.61%",
    backgroundColor: Color.mediumseagreen,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    left: "8.08%",
  },
  subtitle1: {
    width: "61.54%",
    top: "80.63%",
    left: "10.77%",
    fontSize: FontSize.size_smi,
    lineHeight: 16,
    fontFamily: FontFamily.bodyRegular,
    color: Color.mediumseagreen,
  },
  icon: {
    borderRadius: Border.br_base,
    width: "100%",
    height: "100%",
  },
  card1: {
    width: 277,
    height: 160,
  },
});

export default Card1;
