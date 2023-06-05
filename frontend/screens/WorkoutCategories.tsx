import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import CardContainer from "../components/CardContainer";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const WorkoutCategories = () => {
  const [tabsValue, setTabsValue] = useState("Beginner");

  return (
    <View style={styles.workoutCategories}>
      <Image
        style={styles.navigationBarIcon}
        contentFit="cover"
        source={require("../assets/navigation-bar2.png")}
      />
      <View style={[styles.tabs, styles.tabsFlexBox]}>
        <RNPRadioButton.Group value={tabsValue} onValueChange={setTabsValue}>
          <View>
            <View style={[styles.view1, styles.tabsFlexBox]}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Beginner"
              />
              <Text>Beginner</Text>
            </View>
            <View style={[styles.view1, styles.tabsFlexBox]}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Intermediate"
              />
              <Text>Intermediate</Text>
            </View>
            <View style={[styles.view1, styles.tabsFlexBox]}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Advance"
              />
              <Text>Advance</Text>
            </View>
          </View>
        </RNPRadioButton.Group>
      </View>
      <Text style={styles.title}>Workout Categories</Text>
      <View style={[styles.cardsWrapper, styles.cardsLayout]}>
        <View style={[styles.cards, styles.cardsLayout]}>
          <CardContainer
            workoutTitle={require("../assets/image8.png")}
            workoutSubtitle="Wake Up Call"
            workoutNumber="04 Workouts  for Beginner"
          />
          <CardContainer
            workoutTitle={require("../assets/image9.png")}
            workoutSubtitle="Full Body Goal Crusher"
            workoutNumber="07 Workouts  for Beginner"
            propMarginTop={16}
            propWidth={167}
            propAlignSelf="stretch"
            propBackgroundColor="#ff2424"
            propColor="#7ace88"
          />
          <CardContainer
            workoutTitle={require("../assets/image10.png")}
            workoutSubtitle="Lower Body Strength"
            workoutNumber="05 Workouts  for Beginner"
            propMarginTop={16}
            propWidth={167}
            propAlignSelf="stretch"
            propBackgroundColor="#ff2424"
            propColor="#7ace88"
          />
          <CardContainer
            workoutTitle={require("../assets/image11.png")}
            workoutSubtitle="Drill Essentials"
            workoutNumber="06 Workouts  for Beginner"
            propMarginTop={16}
            propWidth="unset"
            propAlignSelf="unset"
            propBackgroundColor="#7ace88"
            propColor="#fff"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsText: {},
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tabsFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardsLayout: {
    width: 327,
    position: "absolute",
  },
  navigationBarIcon: {
    height: "11.33%",
    marginLeft: -187.5,
    top: "88.67%",
    bottom: "0%",
    left: "50%",
    maxHeight: "100%",
    width: 375,
    position: "absolute",
  },
  view1: {
    alignItems: "center",
  },
  tabs: {
    height: "3.45%",
    width: "87.2%",
    top: "14.41%",
    right: "6.4%",
    bottom: "82.14%",
    left: "6.4%",
    borderRadius: Border.br_13xl,
    alignItems: "center",
    position: "absolute",
  },
  title: {
    top: "7.39%",
    left: "24%",
    fontSize: FontSize.h5Semibold_size,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  cards: {
    top: -177,
    left: -24,
    alignItems: "center",
  },
  cardsWrapper: {
    top: 177,
    left: 24,
    height: 688,
  },
  workoutCategories: {
    backgroundColor: Color.bg,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default WorkoutCategories;
