import React, { useState } from "react";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import BeginnerWorkoutContainer from "../components/BeginnerWorkoutContainer";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const WorkoutCategories = () => {
  const [tabsValue, setTabsValue] = useState("Beginner");
  const navigation = useNavigation();

  return (
    <View style={styles.workoutCategories}>
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
      <ScrollView
        style={styles.cardsWrapper}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.cards}>
          <BeginnerWorkoutContainer
            workoutTitle={require("../assets/image9.png")}
            workoutSubtitle="Wake Up Call"
            workoutNumber="04 Workouts  for Beginner"
          />
          <BeginnerWorkoutContainer
            workoutTitle={require("../assets/image10.png")}
            workoutSubtitle="Full Body Goal Crusher"
            workoutNumber="07 Workouts  for Beginner"
            propMarginTop={16}
            propWidth={167}
            propAlignSelf="stretch"
            propBackgroundColor="#ff2424"
            propColor="#7ace88"
          />
          <BeginnerWorkoutContainer
            workoutTitle={require("../assets/image11.png")}
            workoutSubtitle="Lower Body Strength"
            workoutNumber="05 Workouts  for Beginner"
            propMarginTop={16}
            propWidth={167}
            propAlignSelf="stretch"
            propBackgroundColor="#ff2424"
            propColor="#7ace88"
          />
          <BeginnerWorkoutContainer
            workoutTitle={require("../assets/image12.png")}
            workoutSubtitle="Drill Essentials"
            workoutNumber="06 Workouts  for Beginner"
            propMarginTop={16}
            propWidth="unset"
            propAlignSelf="unset"
            propBackgroundColor="#7ace88"
            propColor="#fff"
          />
        </View>
      </ScrollView>
      <View style={[styles.titleParent, styles.circleLeftLayout]}>
        <Text style={styles.title}>Workout Categories</Text>
        <Pressable
          style={[styles.circleLeft, styles.circleLeftLayout]}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/circle-left2.png")}
          />
        </Pressable>
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
  frameScrollViewContent: {
    flexDirection: "column",
  },
  tabsFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleLeftLayout: {
    height: 32,
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
  cards: {
    width: 327,
    alignItems: "center",
  },
  cardsWrapper: {
    top: 177,
    left: 24,
    position: "absolute",
    flex: 1,
  },
  title: {
    top: "9.38%",
    left: "27.55%",
    fontSize: FontSize.h5Semibold_size,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.subtitleMedium,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  circleLeft: {
    left: 0,
    top: 0,
    width: 32,
  },
  titleParent: {
    top: 57,
    left: 17,
    width: 265,
  },
  workoutCategories: {
    backgroundColor: Color.darkslategray_200,
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default WorkoutCategories;
