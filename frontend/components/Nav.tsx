import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";

type NavType = {
  style?: StyleProp<ViewStyle>;
};

const Nav = ({ style }: NavType) => {
  return <View style={[styles.nav, style]} />;
};

const styles = StyleSheet.create({
  nav: {
    alignSelf: "stretch",
  },
});

export default Nav;
