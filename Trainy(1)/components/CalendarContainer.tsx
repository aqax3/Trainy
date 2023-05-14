import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Padding, Border, FontFamily, Color } from "../GlobalStyles";

const CalendarContainer = () => {
  return (
    <View style={styles.calendar}>
      <View style={styles.days}>
        <View style={styles.row}>
          <View style={styles.weekdaySpaceBlock}>
            <Text style={styles.mo}>Mo</Text>
          </View>
          <View style={[styles.weekday1, styles.weekdaySpaceBlock]}>
            <Text style={styles.mo}>Tu</Text>
          </View>
          <View style={[styles.weekday1, styles.weekdaySpaceBlock]}>
            <Text style={styles.mo}>We</Text>
          </View>
          <View style={[styles.weekday1, styles.weekdaySpaceBlock]}>
            <Text style={styles.mo}>Th</Text>
          </View>
          <View style={[styles.weekday1, styles.weekdaySpaceBlock]}>
            <Text style={styles.mo}>Fr</Text>
          </View>
          <View style={[styles.weekday1, styles.weekdaySpaceBlock]}>
            <Text style={styles.mo}>Sa</Text>
          </View>
          <View style={[styles.weekday1, styles.weekdaySpaceBlock]}>
            <Text style={styles.mo}>Su</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dateBorder1}>
            <Text style={[styles.text, styles.textTypo]}>1</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>2</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>3</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>4</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>5</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>6</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>7</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dateBorder1}>
            <Text style={[styles.text, styles.textTypo]}>8</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>9</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>10</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>11</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>12</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>13</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>14</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dateBorder1}>
            <Text style={[styles.text, styles.textTypo]}>15</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>16</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>17</Text>
          </View>
          <View style={[styles.dateActive, styles.dateBorder]}>
            <Text style={[styles.text17, styles.textTypo]}>18</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>19</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>20</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>21</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dateBorder1}>
            <Text style={[styles.text, styles.textTypo]}>22</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>23</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>24</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>25</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>26</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>27</Text>
          </View>
          <View style={[styles.dateDefault1, styles.dateBorder1]}>
            <Text style={[styles.text, styles.textTypo]}>28</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.dateBorder}>
            <Text style={[styles.text, styles.textTypo]}>29</Text>
          </View>
          <View style={[styles.dateDefault28, styles.dateBorder]}>
            <Text style={[styles.text, styles.textTypo]}>30</Text>
          </View>
          <View style={styles.dateInactive}>
            <Text style={[styles.text30, styles.textTypo]}>1</Text>
          </View>
          <View style={styles.dateInactive}>
            <Text style={[styles.text30, styles.textTypo]}>2</Text>
          </View>
          <View style={styles.dateInactive}>
            <Text style={[styles.text30, styles.textTypo]}>3</Text>
          </View>
          <View style={styles.dateInactive}>
            <Text style={[styles.text30, styles.textTypo]}>4</Text>
          </View>
          <View style={styles.dateInactive}>
            <Text style={[styles.text30, styles.textTypo]}>5</Text>
          </View>
        </View>
      </View>
      <View style={[styles.header, styles.headerPosition]}>
        <Text style={[styles.december2019, styles.headerPosition]}>
          December 2022
        </Text>
        <Image
          style={styles.headerChild}
          contentFit="cover"
          source={require("../assets/group-7.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekdaySpaceBlock: {
    padding: Padding.p_3xs,
    borderRadius: Border.br_92xl,
    alignItems: "center",
  },
  textTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    height: 31,
    width: 31,
    display: "flex",
    textAlign: "center",
    fontSize: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  dateBorder1: {
    borderWidth: 2.3,
    borderColor: "#fff",
    borderStyle: "solid",
    padding: Padding.p_3xs,
    borderRadius: Border.br_92xl,
    alignItems: "center",
  },
  dateBorder: {
    borderWidth: 1.6,
    borderColor: "#fff",
    borderStyle: "solid",
    padding: Padding.p_3xs,
    borderRadius: Border.br_92xl,
    alignItems: "center",
  },
  headerPosition: {
    height: 34,
    top: 0,
    position: "absolute",
  },
  mo: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemibold,
    height: 31,
    width: 31,
    display: "flex",
    textAlign: "center",
    fontSize: 19,
    color: Color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  weekday1: {
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 9,
    alignItems: "center",
  },
  text: {
    color: Color.white,
  },
  dateDefault1: {
    marginLeft: 5,
  },
  text17: {
    color: Color.black,
  },
  dateActive: {
    backgroundColor: Color.white,
    marginLeft: 5,
  },
  dateDefault28: {
    marginLeft: 5,
  },
  text30: {
    color: Color.dimgray,
  },
  dateInactive: {
    backgroundColor: Color.gray_100,
    borderColor: "#5d5d6d",
    borderWidth: 3.1,
    borderStyle: "solid",
    marginLeft: 5,
    padding: Padding.p_3xs,
    borderRadius: Border.br_92xl,
    alignItems: "center",
  },
  days: {
    top: 72,
    paddingHorizontal: Padding.p_mini,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    left: 2,
    position: "absolute",
  },
  december2019: {
    left: 0,
    fontSize: 28,
    textTransform: "uppercase",
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    width: 235,
    color: Color.white,
  },
  headerChild: {
    top: 5,
    right: 0,
    width: 63,
    height: 25,
    position: "absolute",
  },
  header: {
    width: 409,
    left: 2,
    height: 34,
    top: 0,
  },
  calendar: {
    top: 156,
    left: -1,
    width: 428,
    height: 497,
    position: "absolute",
  },
});

export default CalendarContainer;
