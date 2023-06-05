import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import Rectangle2 from "../components/Rectangle2";
import Day01WarmUpSection from "../components/Day01WarmUpSection";
import Rectangle1 from "../components/Rectangle1";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Home = () => {
  const [tabsValue, setTabsValue] = useState("Beginner");

  return (
    <View style={styles.home}>
      <ScrollView
        style={styles.card2Parent}
        horizontal
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.card2}>
          <View style={[styles.card, styles.cardPosition]}>
            <Image
              style={styles.imageIcon}
              contentFit="cover"
              source={require("../assets/image3.png")}
            />
            <Rectangle2 />
          </View>
          <View style={[styles.title, styles.titleFlexBox]}>
            <Text style={[styles.title1, styles.titleClr]}>Warm up</Text>
            <View style={[styles.subtitle, styles.view1FlexBox]}>
              <View style={styles.vectorLayout} />
              <Text style={[styles.subtitle1, styles.subtitleTypo]}>
                01 Workout
              </Text>
            </View>
          </View>
          <View style={styles.proPosition}>
            <View style={[styles.proBadgeChild, styles.cardPosition]} />
            <Text style={[styles.title2, styles.titleClr]}>PRO</Text>
          </View>
        </View>
        <View style={styles.card2}>
          <View style={[styles.card, styles.cardPosition]}>
            <Image
              style={styles.imageIcon}
              contentFit="cover"
              source={require("../assets/image4.png")}
            />
            <LinearGradient
              style={styles.rectangle}
              locations={[0, 1]}
              colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
            />
          </View>
          <View style={[styles.title, styles.titleFlexBox]}>
            <Text style={[styles.title1, styles.titleClr]}>Warm up</Text>
            <View style={[styles.subtitle, styles.view1FlexBox]}>
              <View style={styles.vectorLayout} />
              <Text style={[styles.subtitle1, styles.subtitleTypo]}>
                01 Workout
              </Text>
            </View>
          </View>
          <View style={styles.proPosition}>
            <View style={[styles.proBadgeChild, styles.cardPosition]} />
            <Text style={[styles.title2, styles.titleClr]}>PRO</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.tabs, styles.subtitleFlexBox]}>
        <RNPRadioButton.Group value={tabsValue} onValueChange={setTabsValue}>
          <View>
            <View style={styles.view1FlexBox}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Beginner"
              />
              <Text>Beginner</Text>
            </View>
            <View style={styles.view1FlexBox}>
              <RNPRadioButton
                color="#6750a4"
                uncheckedColor="#49454f"
                value="Intermediate"
              />
              <Text>Intermediate</Text>
            </View>
            <View style={styles.view1FlexBox}>
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
      <View style={[styles.textParent, styles.titleFlexBox]}>
        <View style={styles.text}>
          <Text style={[styles.workoutCategories, styles.newWorkoutsTypo]}>
            Workout Categories
          </Text>
          <Text style={[styles.newWorkouts, styles.newWorkoutsTypo]}>
            New Workouts
          </Text>
          <Text style={[styles.seeAll, styles.seeAllTypo]}>See All</Text>
        </View>
        <ScrollView
          style={styles.card1Parent}
          horizontal
          contentContainerStyle={styles.frameScrollView1Content}
        >
          <View style={styles.card11}>
            <View style={[styles.card, styles.cardPosition]}>
              <Image
                style={styles.imageIcon}
                contentFit="cover"
                source={require("../assets/image6.png")}
              />
              <Rectangle1 />
            </View>
            <View style={[styles.title6, styles.titleFlexBox]}>
              <Text style={[styles.title7, styles.titleClr]}>
                Learn the Basic of Training
              </Text>
              <View style={[styles.subtitle4, styles.subtitleFlexBox]}>
                <View style={styles.vectorLayout} />
                <Text style={[styles.subtitle5, styles.seeAllTypo]}>
                  06 Workouts for Beginner
                </Text>
              </View>
            </View>
            <View style={[styles.proBadge2, styles.proPosition]}>
              <View style={[styles.proBadgeChild, styles.cardPosition]} />
              <Text style={[styles.title2, styles.titleClr]}>PRO</Text>
            </View>
          </View>
          <View style={styles.card11}>
            <View style={[styles.card, styles.cardPosition]}>
              <Image
                style={styles.imageIcon}
                contentFit="cover"
                source={require("../assets/image7.png")}
              />
              <LinearGradient
                style={styles.rectangle}
                locations={[0, 1]}
                colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
              />
            </View>
            <View style={[styles.title6, styles.titleFlexBox]}>
              <Text style={[styles.title10, styles.titleClr]}>
                Learn the Basic of Training
              </Text>
              <View style={[styles.subtitle6, styles.subtitleFlexBox]}>
                <View style={styles.vectorLayout} />
                <Text style={[styles.subtitle7, styles.subtitleTypo]}>
                  06 Workouts for Beginner
                </Text>
              </View>
            </View>
            <View style={styles.proPosition}>
              <View style={[styles.proBadgeChild, styles.cardPosition]} />
              <Text style={[styles.title2, styles.titleClr]}>PRO</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.top}>
        <Text style={[styles.helloSarah, styles.titleClr]}>
          <Text style={styles.hello}>Hello</Text>
          <Text style={styles.text1}>{` `}</Text>
          <Text style={styles.sarah}>Sarah,</Text>
        </Text>
        <Text style={[styles.goodMorning, styles.subtitleTypo]}>
          Good morning.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameScrollViewContent: {
    flexDirection: "row",
  },
  tabsText: {},
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  frameScrollView1Content: {
    flexDirection: "row",
  },
  cardPosition: {
    left: "0%",
    top: "0%",
  },
  titleFlexBox: {
    justifyContent: "flex-end",
    position: "absolute",
  },
  titleClr: {
    color: Color.white,
    textAlign: "left",
  },
  view1FlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  subtitleTypo: {
    fontFamily: FontFamily.bodyRegular,
    textAlign: "left",
    color: Color.white,
  },
  subtitleFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  newWorkoutsTypo: {
    height: "7.82%",
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    position: "absolute",
  },
  seeAllTypo: {
    color: Color.buttonGreen,
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
  },
  proPosition: {
    height: 16,
    width: 33,
    right: 16,
    bottom: 16,
    position: "absolute",
  },
  imageIcon: {
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: Border.br_base,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
    width: "100%",
  },
  card: {
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  title1: {
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
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
    backgroundColor: Color.buttonGreen,
  },
  subtitle1: {
    marginLeft: 5,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    fontFamily: FontFamily.bodyRegular,
  },
  subtitle: {
    marginTop: 4,
  },
  title: {
    height: 41,
    left: 16,
    bottom: 16,
    justifyContent: "flex-end",
  },
  proBadgeChild: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.premium,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  title2: {
    top: "6.25%",
    left: "15.15%",
    fontSize: FontSize.captionRegular_size,
    lineHeight: 13,
    fontFamily: FontFamily.captionBold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  card2: {
    width: 181,
    height: 205,
  },
  rectangle: {
    backgroundColor: "transparent",
    borderRadius: Border.br_base,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  card2Parent: {
    top: 697,
    left: 14,
    position: "absolute",
    width: "100%",
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
    left: "0%",
    top: "0%",
    height: "7.82%",
  },
  newWorkouts: {
    width: "37.31%",
    top: "33.67%",
    left: "3.03%",
  },
  seeAll: {
    height: "5.44%",
    width: "12.23%",
    top: "1.36%",
    left: "87.77%",
    textAlign: "right",
    position: "absolute",
  },
  text: {
    width: 330,
    height: 294,
  },
  title7: {
    width: 147,
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
  },
  subtitle5: {
    textAlign: "left",
  },
  subtitle4: {
    alignSelf: "stretch",
    marginTop: 4,
  },
  title6: {
    left: 16,
    bottom: 16,
    justifyContent: "flex-end",
  },
  proBadge2: {
    display: "none",
  },
  card11: {
    width: 322,
    height: 160,
  },
  title10: {
    alignSelf: "stretch",
    textAlign: "left",
    fontFamily: FontFamily.h5Semibold,
    fontWeight: "600",
    fontSize: FontSize.subtitleMedium_size,
    color: Color.white,
  },
  subtitle7: {
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    fontFamily: FontFamily.bodyRegular,
  },
  subtitle6: {
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
    left: 14,
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
    fontSize: FontSize.bodyMedium_size,
    lineHeight: 21,
    width: 107,
    height: 21,
    marginTop: 4,
  },
  top: {
    top: 60,
    width: 259,
    left: 14,
    position: "absolute",
  },
  home: {
    backgroundColor: Color.bg,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;
