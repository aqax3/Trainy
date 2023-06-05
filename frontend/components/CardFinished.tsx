import React, { useState, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CheckBox as RNKCheckBox } from "@ui-kitten/components";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

type CardFinishedType = {
  timeDuration?: string;
  exerciseType?: string;
  exerciseDuration?: boolean;

  /** Style props */
  propMarginTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const CardFinished = ({
  timeDuration,
  exerciseType,
  exerciseDuration,
  propMarginTop,
}: CardFinishedType) => {
  const [tickSquarechecked, setTickSquarechecked] = useState(true);
  const finishedStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  return (
    <View style={[styles.finished, finishedStyle]}>
      <View style={styles.finishedChild} />
      <Text style={[styles.subtitle, styles.nameFlexBox]}>{timeDuration}</Text>
      <Text style={[styles.name, styles.nameFlexBox]}>{exerciseType}</Text>
      <RNKCheckBox
        style={styles.tickSquare}
        checked={exerciseDuration}
        onChange={() => setTickSquarechecked(!tickSquarechecked)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  finishedChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_xs,
    backgroundColor: Color.gray,
    position: "absolute",
  },
  subtitle: {
    bottom: 16,
    left: 19,
    fontSize: FontSize.footnoteRegular_size,
    lineHeight: 16,
    fontFamily: FontFamily.bodyRegular,
    color: Color.buttonGreen,
  },
  name: {
    top: 16,
    left: 16,
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
  },
  tickSquare: {
    top: 25,
    right: 16,
    position: "absolute",
  },
  finished: {
    alignSelf: "stretch",
    height: 73,
  },
});

export default CardFinished;
