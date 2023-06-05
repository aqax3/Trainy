import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const EditProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.editProfile, styles.frame2FlexBox]}>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <View style={styles.header}>
          <Pressable
            style={styles.circleLeft}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require("../assets/circle-left1.png")}
            />
          </Pressable>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
      </View>
      <View style={[styles.frame1, styles.frameFlexBox]}>
        <View style={[styles.frame2, styles.frame2FlexBox]}>
          <Pressable style={styles.defaultButton}>
            <View style={[styles.rectangle, styles.iconLayout]} />
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <View style={[styles.parent, styles.icon1Layout]}>
            <ImageBackground
              style={[styles.icon1, styles.icon1Layout]}
              resizeMode="cover"
              source={require("../assets/59.png")}
            />
            <Image
              style={styles.groupChild}
              contentFit="cover"
              source={require("../assets/group-13.png")}
            />
          </View>
        </View>
        <View style={[styles.frame3, styles.frameFlexBox]}>
          <TextInput
            style={styles.inputTypo}
            placeholder="Sarah Wegan"
            keyboardType="default"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={[styles.input1, styles.inputTypo]}
            placeholder="Sarah145@mail.com"
            keyboardType="default"
            placeholderTextColor="#fff"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame2FlexBox: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  frameFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  icon1Layout: {
    height: 120,
    position: "absolute",
  },
  inputTypo: {
    height: 60,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    alignSelf: "stretch",
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
    color: Color.white,
    width: 202,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  frame: {
    width: 322,
  },
  rectangle: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_5xl,
    backgroundColor: Color.buttonGreen,
    position: "absolute",
  },
  buttonText: {
    marginTop: -11,
    marginLeft: -19.5,
    top: "50%",
    left: "50%",
    color: Color.black,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    position: "absolute",
    textAlign: "center",
  },
  defaultButton: {
    height: 50,
    zIndex: 0,
    alignSelf: "stretch",
  },
  icon1: {
    top: 0,
    left: 0,
    borderRadius: 64,
    width: 120,
  },
  groupChild: {
    top: 74,
    left: 90,
    width: 46,
    height: 46,
    position: "absolute",
  },
  parent: {
    top: 14,
    left: 64,
    width: 136,
    zIndex: 1,
  },
  frame2: {
    width: 263,
    height: 448,
    paddingHorizontal: 0,
    paddingVertical: 30,
  },
  input1: {
    marginTop: 20,
  },
  frame3: {
    width: 311,
    marginTop: -472,
  },
  frame1: {
    height: 658,
    paddingTop: Padding.p_167xl,
    paddingRight: Padding.p_2xs,
    paddingBottom: Padding.p_167xl,
    justifyContent: "flex-end",
    marginTop: -246,
    alignSelf: "stretch",
  },
  editProfile: {
    backgroundColor: Color.bg,
    flex: 1,
    paddingLeft: Padding.p_8xl,
    paddingTop: Padding.p_13xl,
    paddingRight: 26,
    paddingBottom: Padding.p_13xl,
    width: "100%",
    justifyContent: "center",
  },
});

export default EditProfile;
