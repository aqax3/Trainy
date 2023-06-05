import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const UnitsOfMeasure = () => {
  const [optionsValue, setOptionsValue] = useState("Metric");
  const navigation = useNavigation();

  return (
    <View style={styles.unitsOfMeasure}>
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
        <Text style={styles.title}>Units of Measure</Text>
      </View>
      <View style={styles.options}>
        <RNPRadioButton.Group
          value={optionsValue}
          onValueChange={setOptionsValue}
        >
          <View>
            <View style={styles.view1}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Metric"
              />
              <Text>Metric</Text>
            </View>
            <View style={styles.view1}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Imperial"
              />
              <Text>Imperial</Text>
            </View>
          </View>
        </RNPRadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsText: {},
  view: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  view1: {
    alignItems: "center",
    flexDirection: "row",
  },
  options: {
    paddingTop: Padding.p_lg,
    marginTop: 32,
    alignItems: "center",
    alignSelf: "stretch",
  },
  unitsOfMeasure: {
    backgroundColor: Color.bg,
    flex: 1,
    overflow: "hidden",
    paddingLeft: Padding.p_5xl,
    paddingTop: Padding.p_37xl,
    paddingRight: Padding.p_13xl,
    paddingBottom: 570,
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default UnitsOfMeasure;
