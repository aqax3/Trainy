import React from "react";
import { Text, TextProps } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const GradientText: React.FC<TextProps> = (props) => {
  const MaskElement = () => <Text {...props} />;

  return (
    <MaskedView maskElement={<MaskElement />}>
      <LinearGradient
        colors={["#1a2d3d", "#e5f4e3", "#4e937a", "#92b4f4"]}
        start={{ x: 0, y: 5 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
