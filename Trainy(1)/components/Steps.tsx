import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar as RNPProgressBar } from "react-native-paper";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

type StepsType = {
  dailyGoal?: string;
  stepsValue?: string;
};

const Steps = ({ dailyGoal, stepsValue }: StepsType) => {
  return (
    <View style={[styles.steps, styles.stepsLayout]}>
      <LinearGradient
        style={[styles.stepsChild, styles.barLayout1]}
        locations={[0, 0.95]}
        colors={["#6b1914", "rgba(107, 25, 20, 0.67)"]}
      />
      <Text style={[styles.currentSteps, styles.dailyGoalTypo]}>
        CURRENT STEPS
      </Text>
      <Text style={[styles.text, styles.textTypo]}>
        <Text style={styles.txt}>
          <Text style={styles.text1}>{stepsValue}</Text>0
          <Text style={styles.text1}>15</Text>
        </Text>
      </Text>
      <View style={[styles.bar, styles.barLayout]}>
        <RNPProgressBar
          style={[styles.rnpprogressbar, styles.barLayout]}
          progress={0.201}
          color="#6750a4"
        />
      </View>
      <Text style={[styles.dailyGoal, styles.dailyGoalTypo]}>DAILY GOAL</Text>
      <Text style={[styles.text3, styles.textTypo]}>{dailyGoal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rnpprogressbar: {
    backgroundColor: Color.white,
  },
  stepsLayout: {
    height: 150,
    width: 188,
    left: 0,
    top: 0,
  },
  barLayout1: {
    borderRadius: Border.br_mini,
    position: "absolute",
  },
  dailyGoalTypo: {
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    left: 16,
    position: "absolute",
  },
  textTypo: {
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  barLayout: {
    height: 13,
    width: 148,
  },
  stepsChild: {
    backgroundColor: "transparent",
    height: 150,
    width: 188,
    left: 0,
    top: 0,
  },
  currentSteps: {
    top: 13,
    width: 145,
    height: 24,
  },
  text1: {
    letterSpacing: "-4%",
  },
  txt: {
    lineBreak: "anywhere",
    width: "100%",
  },
  text: {
    marginLeft: -59.67,
    top: 41,
    left: "50%",
    fontSize: FontSize.size_13xl,
    display: "flex",
    alignItems: "flex-end",
    width: 92,
    height: 34,
  },
  bar: {
    top: 104,
    left: 18,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: Border.br_mini,
    position: "absolute",
  },
  dailyGoal: {
    top: 75,
    width: 120,
    height: 32,
  },
  text3: {
    top: 123,
    width: 63,
    height: 19,
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    left: 16,
    textAlign: "center",
  },
  steps: {
    position: "absolute",
    height: 150,
    width: 188,
    left: 0,
    top: 0,
  },
});

export default Steps;
