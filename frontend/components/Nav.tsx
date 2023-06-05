import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View } from "react-native";

type NavType = {
  style?: StyleProp<ViewStyle>;
};

const Nav = ({ style }: NavType) => {
  return (
    <View>
      <View style={styles.nav1} />
    </View>
  );
};

const styles = StyleSheet.create({
  nav1: {
    position: "relative",
    width: 114,
    height: 26,
  },
});

export default Nav;
