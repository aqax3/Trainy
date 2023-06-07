import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { CheckBox as RNKCheckBox } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Language = () => {
  const [languageschecked, setLanguageschecked] = useState(undefined);
  const navigation = useNavigation();

  return (
    <View style={styles.language}>
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
        <Text style={styles.title}>Language</Text>
      </View>
      <TextInput
        style={[styles.search, styles.searchSpaceBlock]}
        placeholder="Search"
        keyboardType="default"
        placeholderTextColor="#505050"
      />
      <RNKCheckBox
        style={[styles.languages, styles.searchSpaceBlock]}
        checked={languageschecked}
        onChange={() => setLanguageschecked(!languageschecked)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSpaceBlock: {
    marginTop: 32,
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
    color: Color.white,
    textAlign: "center",
    width: 174,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  search: {
    height: 40,
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.bodyRegular_size,
  },
  languages: {
    paddingTop: Padding.p_lg,
    alignItems: "center",
  },
  language: {
    backgroundColor: Color.darkslategray_200,
    flex: 1,
    overflow: "hidden",
    paddingHorizontal: Padding.p_9xl,
    paddingVertical: 40,
    alignItems: "center",
    width: "100%",
  },
});

export default Language;
