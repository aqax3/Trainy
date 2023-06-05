import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Switch } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Notifications = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [switch1Value, setSwitch1Value] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={[styles.notifications, styles.frameFlexBox]}>
      <View style={[styles.frame, styles.frameFlexBox]}>
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
          <Text style={styles.title}>Notifications</Text>
        </View>
        <View style={styles.options}>
          <View style={styles.profileLayout}>
            <Image
              style={[styles.rectangleIcon, styles.rectangleIconLayout]}
              contentFit="cover"
              source={require("../assets/rectangle4.png")}
            />
            <Switch
              style={[styles.switch, styles.switchPosition]}
              value={switchValue}
              onValueChange={setSwitchValue}
              thumbColor="#000"
              trackColor={{ false: "#939393", true: "#7ace88" }}
            />
            <Text style={styles.editProfile}>Workout Reminders</Text>
          </View>
          <View style={[styles.profileList1, styles.profileLayout]}>
            <Image
              style={[styles.rectangleIcon1, styles.rectangleIconLayout]}
              contentFit="cover"
              source={require("../assets/rectangle4.png")}
            />
            <Switch
              style={[styles.switch1, styles.switchPosition]}
              value={switch1Value}
              onValueChange={setSwitch1Value}
              thumbColor="#fff"
              trackColor={{ false: "#939393", true: "#2c2c2e" }}
            />
            <Text style={styles.editProfile}>Program Notifications</Text>
          </View>
        </View>
      </View>
      <Text style={styles.youCanManageContainer}>
        <Text style={styles.youCanManage}>
          You can manage your app notification permission in your
        </Text>
        <Text style={styles.phoneSettings}> Phone Settings</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    overflow: "hidden",
    alignItems: "center",
  },
  rectangleIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: Border.br_xs,
    left: "0%",
    right: "0%",
    top: "98.81%",
    position: "absolute",
    overflow: "hidden",
    width: "100%",
  },
  switchPosition: {
    paddingBottom: 1,
    paddingTop: 1,
    borderRadius: Border.br_60xl_2,
    left: 271,
    top: -1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
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
    width: 203,
    textAlign: "center",
    color: Color.white,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  rectangleIcon: {
    height: "2.38%",
    bottom: "-1.19%",
  },
  switch: {
    paddingLeft: 17,
    paddingRight: 1,
    justifyContent: "flex-end",
  },
  editProfile: {
    top: 1,
    left: 0,
    fontSize: FontSize.bodyMedium_size,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    textAlign: "left",
    width: 263,
    height: 20,
    position: "absolute",
    color: Color.white,
  },
  rectangleIcon1: {
    height: "1.19%",
    bottom: "0%",
  },
  switch1: {
    paddingLeft: 1,
    paddingRight: 17,
  },
  profileList1: {
    marginTop: 20,
  },
  options: {
    paddingTop: Padding.p_lg,
    marginTop: 32,
    alignSelf: "stretch",
    alignItems: "center",
  },
  frame: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  youCanManage: {
    color: Color.white,
  },
  phoneSettings: {
    color: Color.buttonGreen,
  },
  youCanManageContainer: {
    fontSize: FontSize.footnoteRegular_size,
    lineHeight: 16,
    fontFamily: FontFamily.bodyRegular,
    marginTop: 494,
    textAlign: "center",
    alignSelf: "stretch",
  },
  notifications: {
    backgroundColor: Color.bg,
    flex: 1,
    paddingLeft: 29,
    paddingTop: Padding.p_25xl,
    paddingRight: Padding.p_9xl,
    paddingBottom: Padding.p_25xl,
    alignItems: "center",
    width: "100%",
  },
});

export default Notifications;
