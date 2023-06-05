import React, { useState } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import Card4 from "./Card4";
import Card1 from "./Card1";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const RecommendedContainer = () => {
  const [frameFlatListData, setFrameFlatListData] = useState([
    <Card4 />,
    <Card1 />,
  ]);

  return (
    <View style={styles.recommended}>
      <Text style={styles.title}>Recommended</Text>
      <FlatList
        style={styles.recommendedChild}
        data={frameFlatListData}
        renderItem={({ item }) => item}
        contentContainerStyle={styles.frameFlatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlatListContent: {
    flexDirection: "row",
  },
  title: {
    fontSize: FontSize.subtitleMedium_size,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
    textAlign: "left",
  },
  recommendedChild: {
    alignSelf: "stretch",
    flex: 1,
    marginTop: 14,
  },
  recommended: {
    position: "absolute",
    top: 421,
    left: 23,
    width: 537,
  },
});

export default RecommendedContainer;
