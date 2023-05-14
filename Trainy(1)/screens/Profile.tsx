import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Color, Border, FontSize, FontFamily, Padding } from "../GlobalStyles";

const Profile = () => {
  return (
    <LinearGradient
      style={styles.profile}
      locations={[0, 1]}
      colors={["#1c1c19", "#252622"]}
    >
      <View style={[styles.iphoneWithNotch, styles.timeFlexBox]}>
        <View style={[styles.leftArea, styles.areaFlexBox]}>
          <View style={[styles.time, styles.timeFlexBox]}>
            <Text style={styles.text}>4:20</Text>
            <Image
              style={styles.locationServicesActiveWit}
              contentFit="cover"
              source={require("../assets/location-services--active-with-condition.png")}
            />
          </View>
        </View>
        <View style={styles.notchArea} />
        <View style={[styles.rightArea, styles.areaFlexBox]}>
          <View style={[styles.statusArea, styles.statusAreaPosition]}>
            <View style={[styles.autoLayout, styles.statusAreaPosition]}>
              <View style={styles.sim1SingleSim}>
                <View style={[styles.bar4, styles.barPosition]} />
                <View style={[styles.bar3, styles.barPosition]} />
                <View style={[styles.bar2, styles.barPosition]} />
                <View style={[styles.bar1, styles.barPosition]} />
              </View>
              <Image
                style={styles.networkWifiFull}
                contentFit="cover"
                source={require("../assets/network--wifi-full.png")}
              />
              <Image
                style={styles.batteryFullUncharged}
                contentFit="cover"
                source={require("../assets/battery--full-uncharged.png")}
              />
            </View>
          </View>
          <Image
            style={styles.privacyIndicatorNone}
            contentFit="cover"
            source={require("../assets/privacy-indicator--none.png")}
          />
        </View>
      </View>
      <View style={[styles.recomendation, styles.recomendationLayout]}>
        <LinearGradient
          style={[styles.recomendationChild, styles.childLayout]}
          locations={[0, 1]}
          colors={["#6b1914", "rgba(107, 25, 20, 0.63)"]}
        />
        <Text style={[styles.hereAreSome, styles.trainyTypo]}>
          Here are some recomended workout plans:
        </Text>
        <View style={[styles.card, styles.cardLayout]}>
          <View style={[styles.cardChild, styles.cardLayout]} />
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image1.png")}
          />
          <Text style={[styles.duration, styles.durationTypo]}>duration:</Text>
          <Text style={styles.difficulty}>difficulty:</Text>
          <Text style={[styles.extreme, styles.weekTypo2]}>extreme</Text>
          <Text
            style={[styles.ultimateCalisthenicWorkout, styles.durationTypo]}
          >
            Ultimate calisthenic workout
          </Text>
          <Text style={[styles.week, styles.weekTypo2]}>10 week</Text>
        </View>
        <View style={[styles.card1, styles.cardLayout]}>
          <View style={[styles.cardChild, styles.cardLayout]} />
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image1.png")}
          />
          <Text style={[styles.duration, styles.durationTypo]}>duration:</Text>
          <Text style={styles.difficulty}>difficulty:</Text>
          <Text style={[styles.extreme, styles.weekTypo2]}>extreme</Text>
          <Text
            style={[styles.ultimateCalisthenicWorkout, styles.durationTypo]}
          >
            Ultimate calisthenic workout
          </Text>
          <Text style={[styles.week1, styles.weekTypo1]}>10 week</Text>
        </View>
        <View style={[styles.card2, styles.cardLayout]}>
          <View style={[styles.cardChild, styles.cardLayout]} />
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image1.png")}
          />
          <Text style={[styles.duration, styles.durationTypo]}>duration:</Text>
          <Text style={styles.difficulty}>difficulty:</Text>
          <Text style={[styles.extreme, styles.weekTypo2]}>extreme</Text>
          <Text style={[styles.week2, styles.weekTypo1]}>10 week</Text>
          <Text
            style={[styles.ultimateCalisthenicWorkout, styles.durationTypo]}
          >
            Ultimate calisthenic workout
          </Text>
        </View>
      </View>
      <View style={[styles.calendar, styles.calendarLayout]}>
        <LinearGradient
          style={[styles.calendarChild, styles.calendarLayout]}
          locations={[0, 0.95]}
          colors={["#313c2b", "#3a4635"]}
        />
        <View style={styles.daysOfTheWeek}>
          <Pressable style={[styles.monday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>18</Text>
            <Text style={[styles.m, styles.mLayout]}>M</Text>
            <View style={[styles.mondayItem, styles.text11Position]} />
          </Pressable>
          <Pressable style={[styles.tuesday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>19</Text>
            <Text style={[styles.m, styles.mLayout]}>T</Text>
            <View style={[styles.mondayItem, styles.text11Position]} />
          </Pressable>
          <Pressable style={[styles.wednesday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>20</Text>
            <Text style={[styles.m, styles.mLayout]}>W</Text>
          </Pressable>
          <Pressable style={[styles.thursday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>21</Text>
            <Text style={[styles.m, styles.mLayout]}>T</Text>
          </Pressable>
          <Pressable style={[styles.friday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>22</Text>
            <Text style={[styles.m, styles.mLayout]}>F</Text>
          </Pressable>
          <Pressable style={[styles.saturday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>23</Text>
            <Text style={[styles.m, styles.mLayout]}>S</Text>
          </Pressable>
          <Pressable style={[styles.sunday, styles.mondayLayout]}>
            <View style={[styles.mondayChild, styles.mondayBorder]} />
            <Text style={[styles.text1, styles.textTypo]}>24</Text>
            <Text style={[styles.m, styles.mLayout]}>S</Text>
          </Pressable>
        </View>
        <Text style={[styles.thisWeek, styles.weekTypo]}>THIS WEEK</Text>
        <Text style={[styles.nextWeek, styles.weekTypo]}>NEXT WEEK</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.steps, styles.stepsLayout]}>
          <LinearGradient
            style={[styles.stepsChild, styles.stepsLayout]}
            locations={[0, 0.95]}
            colors={["#6b1914", "rgba(107, 25, 20, 0.67)"]}
          />
          <Text style={[styles.currentSteps, styles.text11Position]}>
            CURRENT STEPS
          </Text>
          <Text style={[styles.text8, styles.weekTypo]}>
            <Text style={styles.txt}>
              <Text style={styles.text9}>2</Text>0
              <Text style={styles.text9}>15</Text>
            </Text>
          </Text>
          <View style={[styles.bar, styles.mLayout]} />
          <Text style={[styles.dailyGoal, styles.text11Position]}>
            DAILY GOAL
          </Text>
          <Text style={[styles.text11, styles.text11Position]}>10000</Text>
        </View>
        <View style={[styles.calories, styles.stepsLayout]}>
          <LinearGradient
            style={[styles.stepsChild, styles.stepsLayout]}
            locations={[0, 0.83]}
            colors={["#242522", "#2c2c28"]}
          />
          <Text style={[styles.caloriesLost, styles.trainyTypo]}>
            Calories Lost
          </Text>
          <Text style={styles.text12}>1350</Text>
        </View>
      </View>
      <View style={[styles.hero, styles.heroLayout]}>
        <Image
          style={[styles.heroChild, styles.heroLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4.png")}
        />
        <Image
          style={[styles.notAWeebButZeroTwoWaifuIcon, styles.heroLayout]}
          contentFit="cover"
          source={require("../assets/notaweebbutzerotwowaifumuscularguynecktobellyredwa2cec8672d05a48cd8a215aac544222e721.png")}
        />
      </View>
      <View style={[styles.topNav, styles.topNavLayout]}>
        <Image
          style={styles.cogwheel1Icon}
          contentFit="cover"
          source={require("../assets/cogwheel-1.png")}
        />
        <Text style={[styles.trainy, styles.topNavLayout]}>TRAINY</Text>
        <View style={[styles.rectangleParent, styles.groupChildPosition]}>
          <View style={[styles.groupChild, styles.groupChildPosition]} />
          <View style={styles.lineParent}>
            <View style={[styles.instanceChild, styles.instanceBorder]} />
            <View style={[styles.instanceItem, styles.instanceBorder]} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  timeFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  areaFlexBox: {
    flex: 1,
    height: 44,
  },
  statusAreaPosition: {
    top: "50%",
    position: "absolute",
  },
  barPosition: {
    width: 3,
    backgroundColor: Color.white,
    borderRadius: Border.br_12xs,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
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
  trainyTypo: {
    letterSpacing: -0.8,
    fontSize: FontSize.size_xl,
    color: Color.white,
    fontFamily: FontFamily.roboto,
  },
  cardLayout: {
    height: 176,
    width: 111,
    position: "absolute",
  },
  durationTypo: {
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  weekTypo2: {
    width: 46,
    left: 62,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  weekTypo1: {
    left: 64,
    width: 46,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    height: 10,
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
    position: "absolute",
  },
  mondayBorder: {
    borderColor: "#fff",
    borderStyle: "solid",
  },
  textTypo: {
    height: 19,
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
  },
  mLayout: {
    height: 13,
    position: "absolute",
  },
  text11Position: {
    left: 16,
    position: "absolute",
  },
  weekTypo: {
    display: "flex",
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  stepsLayout: {
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
  instanceBorder: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  text: {
    fontSize: FontSize.size_mid,
    letterSpacing: -0.7,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.roboto,
  },
  locationServicesActiveWit: {
    width: 16,
    height: 16,
    display: "none",
    marginLeft: 2,
    overflow: "hidden",
  },
  time: {
    marginLeft: -15.5,
    top: 16,
    left: "50%",
  },
  leftArea: {
    height: 44,
    overflow: "hidden",
  },
  notchArea: {
    width: 210,
    height: 44,
  },
  bar4: {
    marginTop: -6,
    marginLeft: 6.35,
    height: 12,
  },
  bar3: {
    marginTop: -3.6,
    marginLeft: 1.05,
    height: 10,
  },
  bar2: {
    marginTop: -1,
    marginLeft: -4.25,
    height: 7,
  },
  bar1: {
    marginTop: 1.4,
    marginLeft: -9.55,
    height: 5,
  },
  sim1SingleSim: {
    width: 20,
    height: 14,
    overflow: "hidden",
  },
  networkWifiFull: {
    marginLeft: 3,
    height: 12,
    width: 20,
    overflow: "hidden",
  },
  batteryFullUncharged: {
    width: 28,
    marginLeft: 3,
    height: 14,
  },
  autoLayout: {
    marginTop: -7,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    top: "50%",
  },
  statusArea: {
    marginTop: -4,
    marginLeft: -37.5,
    width: 74,
    height: 14,
    left: "50%",
  },
  privacyIndicatorNone: {
    top: 6,
    width: 6,
    height: 6,
    left: 6,
    position: "absolute",
  },
  rightArea: {
    height: 44,
  },
  iphoneWithNotch: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    left: 0,
    top: 0,
    width: 428,
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
    textAlign: "center",
    position: "absolute",
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
    top: 131,
    height: 12,
  },
  difficulty: {
    width: 43,
    top: 154,
    letterSpacing: -0.5,
    fontSize: FontSize.size_xs,
    left: 7,
    textAlign: "center",
    height: 14,
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  extreme: {
    top: 154,
    left: 62,
    height: 12,
  },
  ultimateCalisthenicWorkout: {
    top: 14,
    width: 108,
    height: 20,
    left: 0,
  },
  week: {
    top: 132,
    height: 10,
  },
  card: {
    left: 19,
    top: 43,
    width: 111,
  },
  week1: {
    top: 131,
  },
  card1: {
    left: 153,
    top: 43,
    width: 111,
  },
  week2: {
    top: 132,
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
    position: "absolute",
    left: 0,
  },
  text1: {
    top: 8,
    left: 10,
    width: 26,
    position: "absolute",
  },
  m: {
    top: 33,
    left: 12,
    fontSize: FontSize.size_sm,
    letterSpacing: -0.6,
    color: Color.white,
    fontFamily: FontFamily.roboto,
    textAlign: "center",
    width: 20,
  },
  mondayItem: {
    top: 48,
    borderTopWidth: 1,
    width: 12,
    height: 1,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  monday: {
    left: 0,
  },
  tuesday: {
    left: 55,
  },
  wednesday: {
    left: 111,
  },
  thursday: {
    left: 166,
  },
  friday: {
    left: 222,
  },
  saturday: {
    left: 277,
  },
  sunday: {
    left: 333,
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
    top: 7,
    display: "flex",
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    justifyContent: "center",
    alignItems: "center",
    width: 94,
  },
  nextWeek: {
    left: 266,
    width: 109,
    top: 7,
    display: "flex",
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    top: 474,
    left: 6,
  },
  stepsChild: {
    borderRadius: Border.br_mini,
    left: 0,
    backgroundColor: "transparent",
  },
  currentSteps: {
    top: 13,
    width: 145,
    height: 24,
    letterSpacing: -0.6,
    color: Color.white,
    fontFamily: FontFamily.roboto,
    fontSize: FontSize.size_base,
    left: 16,
    textAlign: "left",
  },
  text9: {
    letterSpacing: "-4%",
  },
  txt: {
    lineBreak: "anywhere",
    width: "100%",
  },
  text8: {
    marginLeft: -59.67,
    top: 41,
    fontSize: FontSize.size_13xl,
    alignItems: "flex-end",
    width: 92,
    height: 34,
    left: "50%",
  },
  bar: {
    top: 104,
    left: 18,
    width: 148,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: Border.br_mini,
    borderWidth: 1,
  },
  dailyGoal: {
    top: 75,
    width: 120,
    height: 32,
    letterSpacing: -0.6,
    color: Color.white,
    fontFamily: FontFamily.roboto,
    fontSize: FontSize.size_base,
    left: 16,
    textAlign: "left",
  },
  text11: {
    top: 123,
    width: 63,
    height: 19,
    letterSpacing: -0.6,
    fontSize: FontSize.size_base,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.roboto,
  },
  steps: {
    left: 0,
  },
  caloriesLost: {
    top: 12,
    left: 29,
    width: 131,
    height: 25,
    textAlign: "center",
    position: "absolute",
  },
  text12: {
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
  cogwheel1Icon: {
    left: 373,
    width: 21,
    height: 20,
    top: 0,
    position: "absolute",
  },
  trainy: {
    width: 82,
    left: 153,
    letterSpacing: -0.8,
    fontSize: FontSize.size_xl,
    color: Color.white,
    fontFamily: FontFamily.roboto,
    textAlign: "left",
    top: 0,
  },
  groupChild: {
    backgroundColor: Color.maroon,
    height: 18,
    borderRadius: Border.br_mini,
  },
  instanceChild: {
    width: 13,
  },
  instanceItem: {
    width: 22,
    marginTop: 4,
  },
  lineParent: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_5xs,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    height: 20,
  },
  topNav: {
    top: 50,
    left: 20,
    width: 394,
  },
  profile: {
    height: 926,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: 428,
  },
});

export default Profile;
