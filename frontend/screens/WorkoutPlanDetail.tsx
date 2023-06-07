import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import { FontFamily, Padding, Color, Border, FontSize } from "../GlobalStyles";

const WorkoutPlanDetail = () => {
  return (
    <View style={styles.workoutPlanDetail}>
      <View style={[styles.background, styles.buttonPosition]}>
        <Image
          style={[styles.imageIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/image6.png")}
        />
        <Image
          style={[styles.rectangleIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle2.png")}
        />
      </View>
      <View style={[styles.button, styles.buttonPosition]}>
        <Image
          style={[styles.rectangleIcon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle3.png")}
        />
        <Pressable style={styles.defaultButton}>
          <View style={styles.rectangle} />
          <Text style={styles.buttonText}>Start Workout</Text>
        </Pressable>
      </View>
      <ExerciseCard
        exerciseTitle={`Simple Warm-Up
Exercises`}
        exerciseDescription={{ uri: "82.01x76x-1869091721" }}
        propTop={588}
      />
      <ExerciseCard
        exerciseTitle="Stability Training Basics"
        exerciseDescription={require("../assets/image8.png")}
        propTop={680}
      />
      <View style={styles.text}>
        <View style={styles.frame}>
          <Text style={styles.title}>Day 01 - Warm Up</Text>
          <Text style={[styles.subtitle, styles.minTypo]}>
            04 Workouts for Beginner
          </Text>
        </View>
        <Text
          style={[styles.description, styles.minTypo]}
        >{`Want your body to be healthy. Join our program with directions according to body’s goals. Increasing physical strength is the goal of strenght training. Maintain body fitness by doing physical exercise at least 2-3 times a week. `}</Text>
      </View>
      <Image
        style={styles.circleLeftIcon}
        contentFit="cover"
        source={require("../assets/circle-left2.png")}
      />
      <View style={styles.info}>
        <View style={styles.calorieSpaceBlock}>
          <Image
            style={styles.playIcon}
            contentFit="cover"
            source={require("../assets/play.png")}
          />
          <Text style={[styles.min, styles.minTypo]}>60 min</Text>
        </View>
        <View style={[styles.calorie, styles.calorieSpaceBlock]}>
          <Image
            style={styles.playIcon}
            contentFit="cover"
            source={require("../assets/flame.png")}
          />
          <Text style={[styles.min, styles.minTypo]}>350 Cal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPosition: {
    alignItems: "center",
    width: 375,
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    maxWidth: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
    width: "100%",
  },
  minTypo: {
    fontFamily: FontFamily.bodyRegular,
    textAlign: "left",
  },
  calorieSpaceBlock: {
    paddingBottom: Padding.p_8xs,
    paddingRight: Padding.p_sm,
    paddingTop: Padding.p_8xs,
    paddingLeft: Padding.p_8xs,
    backgroundColor: Color.gray,
    borderRadius: Border.br_31xl,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageIcon: {
    height: 338,
  },
  rectangleIcon: {
    height: 556,
    marginTop: -82,
  },
  background: {
    top: 0,
  },
  rectangleIcon1: {
    height: 106,
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_5xl,
    backgroundColor: Color.mediumseagreen,
    position: "absolute",
    width: "100%",
  },
  buttonText: {
    marginTop: -11.02,
    marginLeft: -58.5,
    top: "50%",
    left: "50%",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.black,
    textAlign: "center",
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    position: "absolute",
  },
  defaultButton: {
    width: 263,
    height: 28,
    marginTop: -45,
  },
  button: {
    top: 706,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: FontSize.h5Semibold_size,
    lineHeight: 25,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    alignSelf: "stretch",
  },
  subtitle: {
    color: Color.mediumseagreen,
    marginTop: 8,
    lineHeight: 16,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.bodyRegular,
    alignSelf: "stretch",
  },
  frame: {
    width: 173,
    overflow: "hidden",
  },
  description: {
    fontSize: FontSize.bodyRegular_size,
    lineHeight: 21,
    marginTop: 93,
    color: Color.white,
    alignSelf: "stretch",
  },
  text: {
    top: 288,
    left: 32,
    width: 311,
    position: "absolute",
  },
  circleLeftIcon: {
    top: 54,
    left: 16,
    width: 32,
    height: 32,
    position: "absolute",
  },
  playIcon: {
    width: 19,
    height: 19,
  },
  min: {
    marginLeft: 6,
    lineHeight: 16,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.bodyRegular,
    color: Color.white,
  },
  calorie: {
    marginLeft: 17,
  },
  info: {
    top: 369,
    left: 91,
    width: 193,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  workoutPlanDetail: {
    backgroundColor: Color.darkslategray_200,
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default WorkoutPlanDetail;
