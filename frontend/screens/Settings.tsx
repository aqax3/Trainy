import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.settings, styles.settingsLayout]}>
      <View style={styles.header}>
        <Pressable
          style={styles.circleLeft}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/circle-left1.png")}
          />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.options}>
        <Pressable
          style={styles.profileLayout}
          onPress={() => navigation.navigate("UnitsOfMeasure")}
        >
          <Image
            style={[styles.rectangleIcon, styles.settingsLayout]}
            contentFit="cover"
            source={require("../assets/rectangle5.png")}
          />
          <Text style={styles.editProfile}>Units of Measure</Text>
          <Image
            style={styles.rightIcon}
            contentFit="cover"
            source={require("../assets/right1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.profileList1, styles.profileLayout]}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            style={[styles.rectangleIcon, styles.settingsLayout]}
            contentFit="cover"
            source={require("../assets/rectangle5.png")}
          />
          <Text style={styles.editProfile}>Notifications</Text>
          <Image
            style={styles.rightIcon}
            contentFit="cover"
            source={require("../assets/right1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.profileList1, styles.profileLayout]}
          onPress={() => navigation.navigate("Language")}
        >
          <Image
            style={[styles.rectangleIcon, styles.settingsLayout]}
            contentFit="cover"
            source={require("../assets/rectangle5.png")}
          />
          <Text style={styles.editProfile}>Language</Text>
          <Image
            style={styles.rightIcon}
            contentFit="cover"
            source={require("../assets/right1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.profileList1, styles.profileLayout]}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          <Image
            style={[styles.rectangleIcon, styles.settingsLayout]}
            contentFit="cover"
            source={require("../assets/rectangle5.png")}
          />
          <Text style={styles.editProfile}>Contact Us</Text>
          <Image
            style={styles.rightIcon}
            contentFit="cover"
            source={require("../assets/right1.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsLayout: {
    overflow: "hidden",
    width: "100%",
  },
  profileLayout: {
    height: 42,
    alignSelf: "stretch",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  circleLeft: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: FontSize.h5Semibold_size,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.roboto,
    textAlign: "center",
    width: 164,
    color: Color.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  rectangleIcon: {
    height: "2.38%",
    top: "98.81%",
    right: "0%",
    bottom: "-1.19%",
    left: "0%",
    borderRadius: Border.br_xs,
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
  },
  editProfile: {
    top: 3,
    left: 0,
    fontSize: FontSize.bodyMedium_size,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    textAlign: "left",
    position: "absolute",
    color: Color.white,
  },
  rightIcon: {
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    position: "absolute",
  },
  profileList1: {
    marginTop: 19,
  },
  options: {
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_12xs,
    alignItems: "center",
    marginTop: 32,
    alignSelf: "stretch",
  },
  settings: {
    backgroundColor: Color.bg,
    flex: 1,
    paddingLeft: Padding.p_5xl,
    paddingTop: Padding.p_37xl,
    paddingRight: Padding.p_13xl,
    paddingBottom: 446,
    alignItems: "flex-end",
  },
});

export default Settings;
