import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Border } from "../GlobalStyles";

const Rectangle = () => {
  return (
    <LinearGradient
      style={styles.rectangle}
      locations={[0, 1]}
      colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
    />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_base,
    backgroundColor: "transparent",
  },
});

export default Rectangle;
