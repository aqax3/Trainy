import React, { useState } from "react";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Day01WarmUpSection from "../components/Day01WarmUpSection";
import { useNavigation } from "@react-navigation/native";
import Card from "../components/Card";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Home = () => {
  const [tabsValue, setTabsValue] = useState("Beginner");
  const navigation = useNavigation();

  return (
    <View style={styles.home}>
      <View style={[styles.tabs, styles.subtitleFlexBox]}>
        <RNPRadioButton.Group value={tabsValue} onValueChange={setTabsValue}>
          <View>
            <View style={styles.view1}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Beginner"
              />
              <Text>Beginner</Text>
            </View>
            <View style={styles.view1}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Intermediate"
              />
              <Text>Intermediate</Text>
            </View>
            <View style={styles.view1}>
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
      <Day01WarmUpSection />
      <View style={styles.textParent}>
        <View style={styles.text}>
          <Text style={[styles.workoutCategories, styles.titleClr]}>
            Workout Categories
          </Text>
          <Text style={[styles.newWorkouts, styles.titleClr]}>
            New Workouts
          </Text>
          <Pressable
            style={styles.seeAll}
            onPress={() => navigation.navigate("WorkoutCategories")}
          >
            <Text style={[styles.seeAll1, styles.seeAll1Typo]}>See All</Text>
          </Pressable>
        </View>
        <ScrollView
          style={styles.card1Parent}
          horizontal
          contentContainerStyle={styles.frameScrollViewContent}
        >
          <Pressable
            style={styles.card1}
            onPress={() => navigation.navigate("WorkoutPlanDetail")}
          >
            <Card image={require("../assets/image3.png")} />
            <View style={styles.title}>
              <Text style={[styles.title1, styles.titleClr]}>
                Learn the Basic of Training
              </Text>
              <View style={[styles.subtitle, styles.subtitleFlexBox]}>
                <View style={styles.vectorLayout} />
                <Text style={[styles.subtitle1, styles.seeAll1Typo]}>
                  06 Workouts for Beginner
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.card1}
            onPress={() => navigation.navigate("WorkoutPlanDetail")}
          >
            <View style={styles.cardPosition}>
              <Image
                style={[styles.imageIcon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/image4.png")}
              />
              <LinearGradient
                style={[styles.rectangle, styles.imageIconPosition]}
                locations={[0, 1]}
                colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
              />
            </View>
            <View style={styles.title}>
              <Text style={[styles.title4, styles.titleClr]}>
                Learn the Basic of Training
              </Text>
              <View style={[styles.subtitle2, styles.subtitleFlexBox]}>
                <View style={styles.vectorLayout} />
                <Text style={[styles.subtitle3, styles.subtitle3Typo]}>
                  06 Workouts for Beginner
                </Text>
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </View>
      <View style={[styles.top, styles.topPosition]}>
        <Text style={[styles.helloSarah, styles.titleClr]}>
          <Text style={styles.hello}>Hello</Text>
          <Text style={styles.text1}>{` `}</Text>
          <Text style={styles.sarah}>Sarah,</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsText: {},
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  frameScrollViewContent: {
    flexDirection: "row",
  },
  subtitleFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  titleClr: {
    color: Color.white,
    textAlign: "left",
  },
  seeAll1Typo: {
    color: Color.mediumseagreen,
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.size_smi,
  },
  proPosition: {
    height: 16,
    width: 33,
    right: 16,
    bottom: 16,
    position: "absolute",
  },
  cardPosition: {
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
  imageIconPosition: {
    borderRadius: Border.br_base,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  subtitle3Typo: {
    fontFamily: FontFamily.bodyRegular,
    textAlign: "left",
    color: Color.white,
  },
  topPosition: {
    left: 14,
    position: "absolute",
  },
  view1: {
    alignItems: "center",
    flexDirection: "row",
  },
  tabs: {
    height: "5.17%",
    top: "51.35%",
    right: 7,
    bottom: "43.47%",
    borderRadius: Border.br_13xl,
    left: 14,
    position: "absolute",
  },
  workoutCategories: {
    width: "49.85%",
    textAlign: "left",
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
    left: "0%",
    top: "0%",
    height: "7.82%",
    position: "absolute",
  },
  newWorkouts: {
    width: "37.31%",
    top: "33.67%",
    left: "3.03%",
    textAlign: "left",
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
    height: "7.82%",
    position: "absolute",
  },
  seeAll1: {
    height: "5.44%",
    width: "12.23%",
    textAlign: "right",
  },
  seeAll: {
    left: "87.77%",
    top: "1.36%",
    position: "absolute",
  },
  text: {
    width: 330,
    height: 294,
  },
  title1: {
    width: 147,
    textAlign: "left",
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
  },
  vectorLayout: {
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 2,
    width: 11,
    backgroundColor: Color.mediumseagreen,
  },
  subtitle1: {
    textAlign: "left",
  },
  subtitle: {
    marginTop: 4,
    alignSelf: "stretch",
  },
  title: {
    left: 16,
    bottom: 16,
    justifyContent: "flex-end",
    position: "absolute",
  },
  proBadgeChild: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.premium,
  },
  title2: {
    top: "6.25%",
    left: "15.15%",
    fontSize: FontSize.captionRegular_size,
    lineHeight: 13,
    fontFamily: FontFamily.openSansBold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  proBadge: {
    display: "none",
  },
  card1: {
    width: 322,
    height: 160,
  },
  imageIcon: {
    borderRadius: Border.br_base,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  rectangle: {
    backgroundColor: "transparent",
    width: "100%",
  },
  title4: {
    alignSelf: "stretch",
    textAlign: "left",
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
  },
  subtitle3: {
    lineHeight: 16,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.bodyRegular,
  },
  subtitle2: {
    marginTop: 4,
  },
  card1Parent: {
    marginTop: -215,
    alignSelf: "stretch",
    width: "100%",
  },
  textParent: {
    top: 389,
    width: 659,
    justifyContent: "flex-end",
    left: 14,
    position: "absolute",
  },
  hello: {
    fontFamily: FontFamily.roboto,
  },
  text1: {
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
  },
  sarah: {
    fontFamily: FontFamily.roboto,
    fontWeight: "700",
  },
  helloSarah: {
    fontSize: FontSize.size_13xl,
    lineHeight: 43,
    height: 43,
    alignSelf: "stretch",
    textAlign: "left",
  },
  goodMorning: {
    fontSize: FontSize.bodyRegular_size,
    lineHeight: 21,
    width: 107,
    height: 21,
    marginTop: 4,
  },
  top: {
    top: 60,
    width: 259,
  },
  home: {
    backgroundColor: Color.darkslategray_200,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;
