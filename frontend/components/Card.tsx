import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Border } from "../GlobalStyles";

type CardType = {
  image: ImageSourcePropType;
};

const Card = ({ image }: CardType) => {
  return (
    <View style={styles.card}>
      <Image
        style={[styles.imageIcon, styles.imageIconPosition]}
        contentFit="cover"
        source={image}
      />
      <LinearGradient
        style={[styles.rectangle, styles.imageIconPosition]}
        locations={[0, 1]}
        colors={["rgba(17, 17, 18, 0)", "rgba(17, 17, 18, 0.6)"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageIconPosition: {
    borderRadius: Border.br_base,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imageIcon: {
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  rectangle: {
    backgroundColor: "transparent",
  },
  card: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default Card;
