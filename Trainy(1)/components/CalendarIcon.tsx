import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

type CalendarIconType = {
  style?: StyleProp<ViewStyle>;
};

const CalendarIcon = ({ style }: CalendarIconType) => {
  return (
    <Image
      style={[styles.calendarIcon, style]}
      contentFit="cover"
      source={require("../assets/calendar.png")}
    />
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    width: 57,
    height: 57,
  },
});

export default CalendarIcon;
