import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type CalendarIcon1Type = {
  style?: StyleProp<ViewStyle>;
};

const CalendarIcon1 = ({ style }: CalendarIcon1Type) => {
  return (
    <Image
      style={[styles.calendarIcon, style]}
      contentFit="cover"
      source={require("../assets/calendar1.png")}
    />
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    width: 57,
    height: 57,
  },
});

export default CalendarIcon1;
