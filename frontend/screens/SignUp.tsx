import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import axios from "axios";
import StartNav from "../components/StartNav";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigation = useNavigation();
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleSignUp = async () => {
    if (password !== password2) {
      setRegistrationStatus("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.110:5001/register-user",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setEmail("");
        setPassword("");
        setRegistrationStatus("Registration successful!");

        navigation.navigate("Login");
      }
    } catch (error) {
      console.error(error);
      setRegistrationStatus("Registration failed!");
    }
  };

  return (
    <View style={styles.container}>
      <StartNav/>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/background1.png")}
      />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.helloRookies}>
            <Text style={styles.hello}>Hello</Text>
            <Text style={styles.text}> </Text>
            <Text style={styles.rookies}>rookies,</Text>
          </Text>
          <Text style={styles.enterYourInformations}>
            Enter your information below or login with another account
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Password again"
            secureTextEntry
            value={password2}
            onChangeText={setPassword2}
            placeholderTextColor="#fff"
          />
        </View>
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkslategray_200,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  helloRookies: {
    fontSize: FontSize.size_13xl,
    lineHeight: 43,
    fontFamily: FontFamily.roboto,
    color: Color.white,
  },
  hello: {
    fontFamily: FontFamily.roboto,
  },
  text: {
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
  },
  rookies: {
    fontWeight: "700",
    fontFamily: FontFamily.roboto,
  },
  enterYourInformations: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.roboto,
    lineHeight: 16,
    textAlign: "center",
    color: Color.white,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    fontFamily: FontFamily.bodyRegular,
    height: 60,
    fontSize: FontSize.subtitleMedium_size,
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: Color.white,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.mediumseagreen,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: Color.black,
    textAlign: "center",
    fontSize: FontSize.subtitleMedium_size,
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default SignUp;
