import * as React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Steps from "../components/Steps";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const HomeScreen = () => {
  return (
    <LinearGradient
      style={styles.homeScreen}
      locations={[0, 1]}
      colors={["#1c1c19", "#252622"]}
    >
      <StatusBar barStyle="dark-content" translucent={true} />
      <View style={[styles.recomendation, styles.recomendationLayout]}>
        <LinearGradient
          style={[styles.recomendationChild, styles.childLayout]}
          locations={[0, 1]}
          colors={["#6b1914", "rgba(107, 25, 20, 0.63)"]}
        />
        <Text style={[styles.hereAreSome, styles.hereAreSomeTypo]}>
          Here are some recomended workout plans:
        </Text>
        <Pressable style={[styles.card, styles.cardLayout]}>
          <View style={[styles.cardChild, styles.cardLayout]} />
          <ImageBackground
            style={styles.image1Icon}
            resizeMode="cover"
            source={require("../assets/image1.png")}
          />
          <Text style={styles.duration}>duration:</Text>
          <Text style={styles.difficulty}>difficulty:</Text>
          <Text style={styles.extreme}>extreme</Text>
          <Text style={styles.ultimateCalisthenicWorkout}>
            Ultimate calisthenic workout
          </Text>
          <Text style={styles.week}>10 week</Text>
        </Pressable>
        <Pressable style={[styles.card1, styles.cardLayout]}>
          <View style={[styles.cardChild, styles.cardLayout]} />
          <ImageBackground
            style={styles.image1Icon}
            resizeMode="cover"
            source={require("../assets/image1.png")}
          />
          <Text style={styles.duration}>duration:</Text>
          <Text style={styles.difficulty}>difficulty:</Text>
          <Text style={styles.extreme}>extreme</Text>
          <Text style={styles.ultimateCalisthenicWorkout}>
            Ultimate calisthenic workout
          </Text>
          <Text style={[styles.week1, styles.weekTypo1]}>10 week</Text>
        </Pressable>
        <Pressable style={[styles.card2, styles.cardLayout]}>
          <View style={[styles.cardChild, styles.cardLayout]} />
          <ImageBackground
            style={styles.image1Icon}
            resizeMode="cover"
            source={require("../assets/image1.png")}
          />
          <Text style={styles.duration}>duration:</Text>
          <Text style={styles.difficulty}>difficulty:</Text>
          <Text style={styles.extreme}>extreme</Text>
          <Text style={[styles.week2, styles.weekTypo1]}>10 week</Text>
          <Text style={styles.ultimateCalisthenicWorkout}>
            Ultimate calisthenic workout
          </Text>
        </Pressable>
      </View>
      <View style={[styles.calendar, styles.calendarLayout]}>
        <LinearGradient
          style={[styles.calendarChild, styles.calendarLayout]}
          locations={[0, 0.95]}
          colors={["#313c2b", "#3a4635"]}
        />
        <View style={styles.daysOfTheWeek}>
          <View style={[styles.monday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>18</Text>
            <Text style={[styles.m, styles.mTypo]}>M</Text>
            <View style={[styles.mondayItem, styles.mondayBorder]} />
          </View>
          <View style={[styles.tuesday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>19</Text>
            <Text style={[styles.m, styles.mTypo]}>T</Text>
            <View style={[styles.mondayItem, styles.mondayBorder]} />
          </View>
          <View style={[styles.wednesday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>20</Text>
            <Text style={[styles.m, styles.mTypo]}>W</Text>
          </View>
          <View style={[styles.thursday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>21</Text>
            <Text style={[styles.m, styles.mTypo]}>T</Text>
          </View>
          <View style={[styles.friday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>22</Text>
            <Text style={[styles.m, styles.mTypo]}>F</Text>
          </View>
          <View style={[styles.saturday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>23</Text>
            <Text style={[styles.m, styles.mTypo]}>S</Text>
          </View>
          <View style={[styles.sunday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text, styles.mTypo]}>24</Text>
            <Text style={[styles.m, styles.mTypo]}>S</Text>
          </View>
        </View>
        <Text style={[styles.thisWeek, styles.weekTypo]}>THIS WEEK</Text>
        <Text style={[styles.nextWeek, styles.weekTypo]}>NEXT WEEK</Text>
      </View>
      <View style={styles.row}>
        <Steps dailyGoal="10000" stepsValue="2" />
        <View style={[styles.calories, styles.caloriesLayout]}>
          <LinearGradient
            style={[styles.caloriesChild, styles.caloriesLayout]}
            locations={[0, 0.83]}
            colors={["#242522", "#2c2c28"]}
          />
          <Text style={[styles.caloriesLost, styles.hereAreSomeTypo]}>
            Calories Lost
          </Text>
          <Text style={styles.text7}>1350</Text>
        </View>
      </View>
      <View style={[styles.hero, styles.heroLayout]}>
        <Image
          style={[styles.heroChild, styles.heroLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4.png")}
        />
        <ImageBackground
          style={[styles.notAWeebButZeroTwoWaifuIcon, styles.heroLayout]}
          resizeMode="cover"
          source={require("../assets/notaweebbutzerotwowaifumuscularguynecktobellyredwa2cec8672d05a48cd8a215aac544222e721.png")}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    height: 57,
    width: 57,
    top: 0,
    position: "absolute",
  },
  iconLayout: {
    width: 60,
    height: 57,
    top: 0,
    position: "absolute",
  },
  recomendationLayout: {
    height: 231,
    width: 414,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_6xl,
    top: 0,
  },
  hereAreSomeTypo: {
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    letterSpacing: -0.8,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  cardLayout: {
    height: 176,
    width: 111,
    position: "absolute",
  },
  weekTypo1: {
    left: 64,
    height: 10,
    width: 46,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  calendarLayout: {
    height: 130,
    width: 414,
    position: "absolute",
  },
  mondayLayout: {
    width: 45,
    height: 60,
    top: 0,
  },
  mondayBorder: {
    borderColor: "#fff",
    borderStyle: "solid",
    position: "absolute",
  },
  mTypo: {
    letterSpacing: -0.6,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  weekTypo: {
    display: "flex",
    top: 7,
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  caloriesLayout: {
    width: 188,
    height: 150,
    top: 0,
    position: "absolute",
  },
  heroLayout: {
    height: 215,
    position: "absolute",
  },
  topNavLayout: {
    height: 22,
    position: "absolute",
  },
  groupChildPosition: {
    top: 1,
    width: 43,
    left: 0,
    position: "absolute",
  },
  componentBorder: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  recomendationChild: {
    height: 231,
    width: 414,
    position: "absolute",
    left: 0,
    backgroundColor: "transparent",
  },
  hereAreSome: {
    top: 11,
    left: 22,
    width: 358,
    height: 37,
  },
  cardChild: {
    backgroundColor: Color.darkslategray,
    borderRadius: Border.br_mini,
    left: 0,
    top: 0,
  },
  image1Icon: {
    height: 63,
    width: 94,
    left: 7,
    top: 51,
    borderRadius: Border.br_mini,
    position: "absolute",
  },
  duration: {
    left: 4,
    width: 49,
    height: 12,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    top: 131,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  difficulty: {
    height: 14,
    width: 43,
    top: 154,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    left: 7,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  extreme: {
    width: 46,
    left: 62,
    top: 154,
    height: 12,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  ultimateCalisthenicWorkout: {
    top: 14,
    width: 108,
    height: 20,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    left: 0,
    position: "absolute",
  },
  week: {
    height: 10,
    top: 132,
    width: 46,
    left: 62,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  card: {
    left: 19,
    top: 43,
    width: 111,
  },
  week1: {
    left: 64,
    top: 131,
  },
  card1: {
    left: 153,
    top: 43,
    width: 111,
  },
  week2: {
    top: 132,
    left: 64,
  },
  card2: {
    left: 287,
    top: 43,
    width: 111,
  },
  recomendation: {
    top: 619,
    left: 6,
  },
  calendarChild: {
    borderRadius: Border.br_mini,
    left: 0,
    top: 0,
    backgroundColor: "transparent",
  },
  mondayChild: {
    borderRadius: Border.br_3xs,
    borderWidth: 2,
    width: 45,
    height: 60,
    top: 0,
    left: 0,
  },
  text: {
    top: 8,
    left: 10,
    width: 26,
    height: 19,
    fontSize: FontSize.size_base,
    letterSpacing: -0.6,
  },
  m: {
    top: 33,
    left: 12,
    fontSize: FontSize.size_sm,
    width: 20,
    height: 13,
  },
  mondayItem: {
    top: 48,
    left: 16,
    borderTopWidth: 1,
    width: 12,
    height: 1,
  },
  monday: {
    left: 0,
    position: "absolute",
  },
  tuesday: {
    left: 55,
    position: "absolute",
  },
  wednesday: {
    left: 111,
    position: "absolute",
  },
  thursday: {
    left: 166,
    position: "absolute",
  },
  friday: {
    left: 222,
    position: "absolute",
  },
  saturday: {
    left: 277,
    position: "absolute",
  },
  sunday: {
    left: 333,
    position: "absolute",
  },
  daysOfTheWeek: {
    top: 42,
    left: 15,
    width: 378,
    height: 60,
    position: "absolute",
  },
  thisWeek: {
    left: 46,
    width: 94,
  },
  nextWeek: {
    left: 266,
    width: 109,
  },
  calendar: {
    top: 474,
    left: 6,
  },
  caloriesChild: {
    borderRadius: Border.br_mini,
    left: 0,
    backgroundColor: "transparent",
  },
  caloriesLost: {
    top: 12,
    left: 29,
    width: 131,
    height: 25,
  },
  text7: {
    left: 27,
    fontSize: FontSize.size_21xl,
    letterSpacing: -1.6,
    width: 134,
    height: 48,
    top: 51,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  calories: {
    left: 226,
  },
  row: {
    top: 309,
    height: 150,
    width: 414,
    left: 6,
    position: "absolute",
  },
  heroChild: {
    width: 416,
    borderRadius: Border.br_6xl,
    top: 0,
    left: 6,
  },
  notAWeebButZeroTwoWaifuIcon: {
    left: 41,
    width: 347,
    top: 0,
  },
  hero: {
    top: 79,
    left: 0,
    width: 428,
  },
  homeScreen: {
    height: 926,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: 428,
  },
});

export default HomeScreen;
