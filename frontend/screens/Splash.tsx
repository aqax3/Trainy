import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const Splash = () => {
  return (
    <View style={[styles.splash, styles.iconLayout]}>
      <View style={styles.parent}>
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/0-11-1.png")}
        />
        <Text style={styles.trainy}>Trainy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  icon: {
    alignSelf: "stretch",
    maxWidth: "100%",
    height: 500,
  },
  trainy: {
    fontSize: 64,
    letterSpacing: -2.6,
    fontFamily: FontFamily.openSans,
    color: Color.mediumseagreen,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    width: 282,
    height: 90,
    alignItems: "center",
  },
  parent: {
    width: 402,
    alignItems: "center",
  },
  splash: {
    backgroundColor: Color.darkslategray_200,
    flex: 1,
    height: 768,
    flexDirection: "row",
    paddingHorizontal: 36,
    paddingVertical: 83,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Splash;
