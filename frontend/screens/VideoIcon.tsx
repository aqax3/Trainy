import * as React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { ProgressBar as RNPProgressBar } from "react-native-paper";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const VideoIcon = () => {
  return (
    <ImageBackground
      style={styles.videoIcon}
      resizeMode="cover"
      source={require("../assets/video.png")}
    >
      <LinearGradient
        style={[styles.rectangle, styles.timelinePosition]}
        locations={[0, 1]}
        colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.7)"]}
      />
      <Image
        style={styles.circleLeftIcon}
        contentFit="cover"
        source={require("../assets/circle-left.png")}
      />
      <View style={styles.player}>
        <Image
          style={[styles.repeatIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/repeat.png")}
        />
        <Pressable style={[styles.skipBack, styles.skipPosition]}>
          <View style={[styles.skipBack1, styles.timelinePosition]}>
            <View style={[styles.group, styles.groupPosition]}>
              <Image
                style={[styles.path2Icon, styles.path2IconLayout]}
                contentFit="cover"
                source={require("../assets/path-2.png")}
              />
              <View style={[styles.rectangle1, styles.rectangleBg]} />
            </View>
          </View>
        </Pressable>
        <Pressable style={[styles.skipFwd, styles.skipPosition]}>
          <View style={[styles.skipBack1, styles.timelinePosition]}>
            <Image
              style={[styles.path2Icon1, styles.path2IconLayout]}
              contentFit="cover"
              source={require("../assets/path-21.png")}
            />
            <View style={[styles.rectangle2, styles.rectangleBg]} />
          </View>
        </Pressable>
        <Image
          style={[styles.volumeUpIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/volume-up.png")}
        />
        <Image
          style={[styles.pauseIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/pause.png")}
        />
        <View style={[styles.timeline, styles.timelinePosition]}>
          <View style={[styles.wrapper, styles.wrapperPosition]}>
            <RNPProgressBar
              style={styles.rnpprogressbar}
              progress={0.4}
              color="#6750a4"
            />
          </View>
          <View style={[styles.rectangle3, styles.wrapperPosition]} />
          <Text style={styles.title}>Lower Body Strength</Text>
          <Text style={[styles.time, styles.timeTypo]}>04:35</Text>
          <Text style={[styles.duration, styles.timeTypo]}>15:00</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rnpprogressbar: {
    backgroundColor: Color.bg,
    height: "15.38%",
    width: "100%",
  },
  timelinePosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  skipPosition: {
    bottom: "15.2%",
    top: "65.6%",
    width: "7.34%",
    height: "19.2%",
  },
  groupPosition: {
    bottom: "20.83%",
    top: "20.83%",
    height: "58.33%",
  },
  path2IconLayout: {
    borderRadius: Border.br_12xs,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleBg: {
    backgroundColor: Color.white,
    borderRadius: Border.br_12xs,
    position: "absolute",
  },
  wrapperPosition: {
    borderRadius: Border.br_5xl,
    bottom: "33.85%",
    top: "50.77%",
    height: "15.38%",
    left: "0%",
    position: "absolute",
  },
  timeTypo: {
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    top: "75.38%",
    textAlign: "left",
    color: Color.white,
    position: "absolute",
  },
  rectangle: {
    backgroundColor: "transparent",
    bottom: "0%",
    height: "100%",
    left: "0%",
  },
  circleLeftIcon: {
    top: 32,
    left: 0,
    width: 32,
    height: 32,
    position: "absolute",
  },
  repeatIcon: {
    right: "85.63%",
    left: "7.03%",
    bottom: "15.2%",
    top: "65.6%",
    width: "7.34%",
    height: "19.2%",
  },
  path2Icon: {
    height: "88.28%",
    width: "72.41%",
    top: "5.86%",
    right: "100%",
    bottom: "5.86%",
    left: "-72.41%",
  },
  rectangle1: {
    width: "14.29%",
    right: "171.43%",
    left: "-85.71%",
    transform: [
      {
        rotate: "180deg",
      },
    ],
    bottom: "0%",
    top: "0%",
    backgroundColor: Color.white,
    height: "100%",
  },
  group: {
    width: "58.33%",
    right: "-37.5%",
    left: "79.17%",
    transform: [
      {
        rotate: "180deg",
      },
    ],
    position: "absolute",
  },
  skipBack1: {
    bottom: "0%",
    height: "100%",
    left: "0%",
  },
  skipBack: {
    right: "69.11%",
    left: "23.55%",
    position: "absolute",
  },
  path2Icon1: {
    height: "51.5%",
    width: "42.24%",
    top: "24.25%",
    right: "36.93%",
    bottom: "24.25%",
    left: "20.83%",
  },
  rectangle2: {
    width: "8.33%",
    right: "20.83%",
    left: "70.83%",
    bottom: "20.83%",
    top: "20.83%",
    height: "58.33%",
  },
  skipFwd: {
    right: "23.85%",
    left: "68.81%",
    position: "absolute",
  },
  volumeUpIcon: {
    top: "64.8%",
    right: "7.34%",
    bottom: "16%",
    left: "85.32%",
    width: "7.34%",
    height: "19.2%",
    maxWidth: "100%",
  },
  pauseIcon: {
    height: "51.2%",
    width: "19.57%",
    top: "48.8%",
    right: "40.37%",
    left: "40.06%",
    bottom: "0%",
  },
  wrapper: {
    opacity: 0.5,
    right: "0%",
    borderRadius: Border.br_5xl,
    bottom: "33.85%",
    top: "50.77%",
    width: "100%",
  },
  rectangle3: {
    width: "33.03%",
    right: "66.97%",
    backgroundColor: Color.buttonGreen,
  },
  title: {
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    textAlign: "left",
    color: Color.white,
    left: "0.31%",
    top: "0%",
    position: "absolute",
  },
  time: {
    left: "0.31%",
    fontFamily: FontFamily.bodyRegular,
    lineHeight: 16,
    fontSize: FontSize.footnoteRegular_size,
    top: "75.38%",
  },
  duration: {
    left: "89.3%",
  },
  timeline: {
    height: "52%",
    bottom: "48%",
  },
  player: {
    top: 656,
    left: 24,
    width: 327,
    height: 125,
    position: "absolute",
  },
  videoIcon: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default VideoIcon;
