import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import CalendarContainer from "../components/CalendarContainer";
import { Color, Border, FontSize, FontFamily, Padding } from "../GlobalStyles";

const Calendar = () => {
  return (
    <View style={styles.calendar}>
      <View style={[styles.iphoneWithNotch, styles.timeFlexBox]}>
        <View style={styles.leftArea}>
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
        <View style={styles.rightArea}>
          <View style={[styles.statusArea, styles.statusAreaPosition]}>
            <View style={[styles.autoLayout, styles.statusAreaPosition]}>
              <View style={[styles.sim1SingleSim, styles.sim1SingleSimLayout]}>
                <View style={[styles.bar4, styles.barPosition]} />
                <View style={[styles.bar3, styles.barPosition]} />
                <View style={[styles.bar2, styles.barPosition]} />
                <View style={[styles.bar1, styles.barPosition]} />
              </View>
              <Image
                style={[styles.networkWifiFull, styles.sim1SingleSimLayout]}
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
      <View style={styles.nav}>
        <Image
          style={[styles.statsIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/stats.png")}
        />
        <Image
          style={[styles.profileIcon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/profile.png")}
        />
      </View>
      <Pressable style={styles.filter}>
        <Pressable style={[styles.day, styles.monthLayout]}>
          <View style={[styles.dayChild, styles.childPosition]} />
          <Text style={[styles.day1, styles.day1Typo]}>Day</Text>
        </Pressable>
        <Pressable style={[styles.week, styles.monthLayout]}>
          <View style={styles.childPosition} />
          <Text style={[styles.week1, styles.day1Typo]}>Week</Text>
        </Pressable>
        <Pressable style={[styles.month, styles.monthLayout]}>
          <View style={[styles.monthChild, styles.monthLayout]} />
          <Text style={[styles.month1, styles.day1Typo]}>Month</Text>
        </Pressable>
      </Pressable>
      <CalendarContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  timeFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  statusAreaPosition: {
    top: "50%",
    position: "absolute",
  },
  sim1SingleSimLayout: {
    width: 20,
    overflow: "hidden",
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
  monthLayout: {
    width: 135,
    height: 40,
    top: 0,
    position: "absolute",
  },
  childPosition: {
    backgroundColor: Color.darkslategray,
    width: 135,
    height: 40,
    left: 0,
    top: 0,
    position: "absolute",
  },
  day1Typo: {
    letterSpacing: -0.8,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.roboto,
    position: "absolute",
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
    flex: 1,
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
    height: 14,
  },
  networkWifiFull: {
    marginLeft: 3,
    height: 12,
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
    left: 6,
    width: 6,
    height: 6,
    position: "absolute",
  },
  rightArea: {
    height: 44,
    flex: 1,
  },
  iphoneWithNotch: {
    width: 428,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    left: 0,
    top: 0,
    justifyContent: "center",
  },
  statsIcon: {
    left: 275,
  },
  profileIcon: {
    left: 367,
  },
  nav: {
    top: 868,
    left: -1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    width: 430,
    height: 59,
    position: "absolute",
    overflow: "hidden",
  },
  dayChild: {
    borderTopLeftRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_xl,
  },
  day1: {
    left: 50,
    top: 9,
    letterSpacing: -0.8,
    fontSize: FontSize.size_xl,
  },
  day: {
    left: 0,
  },
  week1: {
    left: 43,
    top: 9,
    letterSpacing: -0.8,
    fontSize: FontSize.size_xl,
  },
  week: {
    left: 135,
  },
  monthChild: {
    borderTopRightRadius: Border.br_xl,
    borderBottomRightRadius: Border.br_xl,
    backgroundColor: Color.maroon,
    left: 0,
  },
  month1: {
    top: 8,
    left: 41,
  },
  month: {
    left: 270,
  },
  filter: {
    top: 80,
    left: 8,
    width: 405,
    height: 40,
    position: "absolute",
  },
  calendar: {
    backgroundColor: "#1e1e1b",
    width: "100%",
    height: 926,
    overflow: "hidden",
    flex: 1,
  },
});

export default Calendar;
