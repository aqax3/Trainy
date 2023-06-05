import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import ContainerFrame from "../components/ContainerFrame";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.profile}>
      <Pressable style={styles.circleLeft} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/circle-left1.png")}
        />
      </Pressable>
      <View style={styles.frame}>
        <ContainerFrame />
        <View style={styles.frame1}>
          <View style={styles.options}>
            <Pressable style={styles.profileLayout}>
              <Image
                style={styles.rectangleIcon}
                contentFit="cover"
                source={require("../assets/rectangle2.png")}
              />
              <Text style={[styles.editProfile, styles.signOut1Typo]}>
                Edit Profile
              </Text>
              <Image
                style={styles.rightIcon}
                contentFit="cover"
                source={require("../assets/right.png")}
              />
            </Pressable>
            <Pressable style={[styles.profileList1, styles.profileLayout]}>
              <Image
                style={styles.rectangleIcon}
                contentFit="cover"
                source={require("../assets/rectangle2.png")}
              />
              <Text style={[styles.editProfile, styles.signOut1Typo]}>
                Privacy Policy
              </Text>
              <Image
                style={styles.rightIcon}
                contentFit="cover"
                source={require("../assets/right.png")}
              />
            </Pressable>
            <Pressable style={[styles.profileList1, styles.profileLayout]}>
              <Image
                style={styles.rectangleIcon}
                contentFit="cover"
                source={require("../assets/rectangle2.png")}
              />
              <Text style={[styles.editProfile, styles.signOut1Typo]}>
                Settings
              </Text>
              <Image
                style={styles.rightIcon}
                contentFit="cover"
                source={require("../assets/right.png")}
              />
            </Pressable>
          </View>
          <Pressable
            style={styles.signOut}
            onPress={() => navigation.navigate("SN$93:1113$")}
          >
            <Text style={[styles.signOut1, styles.signOut1Typo]}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signOut1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
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
    overflow: "hidden",
    width: "100%",
  },
  editProfile: {
    top: 3,
    left: 0,
    fontSize: FontSize.bodyMedium_size,
    lineHeight: 18,
    color: Color.white,
    position: "absolute",
  },
  rightIcon: {
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    position: "absolute",
  },
  profileList1: {
    marginTop: 20,
  },
  options: {
    paddingTop: Padding.p_lg,
    paddingBottom: 241,
    alignItems: "center",
    alignSelf: "stretch",
  },
  signOut1: {
    fontSize: FontSize.subtitleMedium_size,
    color: Color.red,
    width: 119,
    height: 20,
  },
  signOut: {
    marginTop: -40,
  },
  frame1: {
    justifyContent: "flex-end",
    marginTop: 24,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame: {
    marginTop: 32,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  profile: {
    backgroundColor: Color.bg,
    flex: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingTop: Padding.p_37xl,
    paddingBottom: Padding.p_25xl,
    overflow: "hidden",
    width: "100%",
  },
});

export default Profile;
