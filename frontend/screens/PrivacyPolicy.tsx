import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.privacyPolicy}>
      <View style={styles.header}>
        <Pressable
          style={styles.circleLeft}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/circle-left1.png")}
          />
        </Pressable>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <Text style={styles.loremIpsumDolorContainer}>
        <Text style={styles.loremIpsumDolor}>{`Lorem ipsum dolor sit amet
`}</Text>
        <Text style={styles.consecteturAdipiscingElitN}>
          <Text style={styles.consecteturAdipiscingElit}>{`
Consectetur adipiscing elit. Natoque phasellus lobortis mattis cursus faucibus hac proin risus. Turpis phasellus massa ullamcorper volutpat. Ornare commodo non integer fermentum nisi, morbi id. Vel tortor mauris feugiat amet, maecenas facilisis risus, in faucibus. Vestibulum ullamcorper fames eget enim diam fames faucibus duis ac. Aliquam non tellus semper in dignissim nascetur venenatis lacus.

Lectus vel non varius interdum vel tellus sed mattis. Sit laoreet auctor arcu mauris tincidunt sociis tristique pharetra neque. Aliquam pharetra elementum nisl sapien. Erat nisl morbi eu dolor in. Sapien ut lacus dui libero morbi tristique.

Sit praesent mi, dolor, magna in pellentesque sollicitudin odio sed. Sit nibh aliquam enim ipsum lectus sem fermentum congue velit. Purus habitant odio in morbi aliquet velit pulvinar. Facilisis ut amet interdum pretium. Fames pretium eget orci facilisis mattis est libero facilisis ullamcorper. Est auctor amet egestas risus libero et. Auctor faucibus sit id fringilla vitae. Ac volutpat sodales tristique ut netus turpis.

`}</Text>
          <Text
            style={styles.loremIpsumDolor1}
          >{`Lorem ipsum dolor sit amet, consectetur `}</Text>
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: "100%",
    width: "100%",
  },
  circleLeft: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: FontSize.h5Semibold_size,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.roboto,
    width: 229,
    textAlign: "center",
    color: Color.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  loremIpsumDolor: {
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: FontFamily.h5Semibold,
    color: Color.white,
  },
  consecteturAdipiscingElit: {
    color: "#b5b5b5",
  },
  loremIpsumDolor1: {
    color: "#ccc",
  },
  consecteturAdipiscingElitN: {
    lineHeight: 21,
    fontFamily: FontFamily.interRegular,
  },
  loremIpsumDolorContainer: {
    fontSize: FontSize.bodyMedium_size,
    marginTop: 32,
    textAlign: "center",
    alignSelf: "stretch",
  },
  privacyPolicy: {
    backgroundColor: Color.bg,
    flex: 1,
    overflow: "hidden",
    paddingLeft: Padding.p_9xl,
    paddingTop: Padding.p_37xl,
    paddingRight: Padding.p_8xl,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default PrivacyPolicy;
