import * as React from "react";
import { StyleProp, ViewStyle, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

type StartNavType = {
  style?: StyleProp<ViewStyle>;
};

const StartNav = ({ style }: StartNavType) => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={[styles.startNav,{marginTop: 50} , style]}>
      <TouchableOpacity style={styles.login} onPress={handleLoginPress}>
        <Text style={styles.login1Typo}>Login</Text>
        <View style={styles.selection} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={[styles.signUp, styles.login1Typo]}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  login1Typo: {
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    lineHeight: 16,
    fontSize: FontSize.size_smi,
  },
  selection: {
    backgroundColor: Color.mediumseagreen,
    height: 3,
    marginTop: 7,
    width: 35,
  },
  login: {
    width: 35,
    height: 26,
    alignItems: "center",
  },
  signUp: {
    marginLeft: 32,
  },
  tabs: {
    width: 113,
    height: 26,
    flexDirection: "row",
  },
  profilePictureIcon: {
    width: 57,
    height: 57,
  },
  startNav: {
    width: 370,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default StartNav;
