import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartNav from "../components/StartNav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.110:5001/login-user", {
        email,
        password,
      });

      console.log(response.data);
      setEmail("");
      setPassword("");
      setLoginStatus("Login successful!");

      console.log(response.data.userToken);

      await AsyncStorage.setItem("userToken", response.data.userToken);
      await AsyncStorage.setItem("username", response.data.user.username);
    } catch (error) {
      console.error(error);
      setLoginStatus("Login failed!");
    }
  };



  return (
    <View style={[styles.login, styles.loginLayout]}>
      <StartNav />
      <View style={styles.bg}>
        <View style={styles.background}>
          <Image
            style={[styles.backgroundIcon, styles.loginLayout]}
            contentFit="cover"
            source={require("../assets/background.png")}
          />
          <Text style={styles.welcomeBackSarahContainer}>
            <Text style={styles.welcomeBack}>{`Welcome back,
`}</Text>
            <Text style={styles.sarah}>Rookie</Text>
          </Text>
        </View>
      </View>
      <View style={styles.input}>
        <View style={styles.inputs}>
          <TextInput
            style={[styles.input1, styles.inputTypo]}
            placeholder="Email"
            keyboardType="default"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#fff"
          />
          <TextInput
            style={[styles.input2, styles.inputTypo]}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#fff"
            passwordRules="Password"
          />
          <Pressable
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("Frame22")}
          >
            <Text style={[styles.forgotPassword1, styles.signTypo]}>
              Forgot Password
            </Text>
          </Pressable>
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={styles.smallButton}
            onPress={() =>
              navigation.navigate("BottomTabsRoot", { screen: "Home" })
            }
          >
            <View style={styles.signUpParent}>
              <Text style={[styles.signUp2, styles.signTypo]}>Login</Text>
              <Image
                style={styles.chevronRightIcon}
                contentFit="cover"
                source={require("../assets/chevronright.png")}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );

};


const styles = StyleSheet.create({
  loginLayout: {
    width: "100%",
    overflow: "hidden",
  },
  signTypo: {
    fontFamily: FontFamily.subtitleMedium,
    fontWeight: "600",
  },
  inputTypo: {
    fontFamily: FontFamily.bodyRegular,
    height: 60,
    fontSize: FontSize.subtitleMedium_size,
    alignSelf: "stretch",
  },
  backgroundIcon: {
    maxWidth: "100%",
    height: 460,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  welcomeBack: {
    fontFamily: FontFamily.roboto,
  },
  sarah: {
    fontWeight: "700",
    fontFamily: FontFamily.roboto,
  },
  welcomeBackSarahContainer: {
    fontSize: 36,
    lineHeight: 43,
    width: 374,
    textAlign: "left",
    color: Color.white,
  },
  background: {
    width: "100%",
    paddingRight: Padding.p_12xs,
    alignItems: "center",
  },
  bg: {
    
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  input1: {
    fontSize: FontSize.subtitleMedium_size,
  },
  input2: {
    marginTop: 20,
    fontSize: FontSize.subtitleMedium_size,
  },
  forgotPassword1: {
    color: Color.mediumseagreen,
    lineHeight: 16,
    fontSize: FontSize.size_smi,
    fontWeight: "600",
    textAlign: "left",
  },
  forgotPassword: {
    marginTop: 20,
  },
  inputs: {
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  signUp2: {
    color: Color.black,
    textAlign: "center",
    fontSize: FontSize.subtitleMedium_size,
  },
  chevronRightIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    overflow: "hidden",
  },
  signUpParent: {
    flexDirection: "row",
    flex: 1,
  },
  smallButton: {
    borderRadius: Border.br_29xl,
    paddingLeft: Padding.p_9xl,
    paddingTop: Padding.p_smi,
    paddingRight: Padding.p_xl,
    paddingBottom: Padding.p_smi,
    justifyContent: "center",
    backgroundColor: Color.mediumseagreen,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  buttons: {
    width: 138,
    marginTop: 44,
    alignItems: "flex-end",
  },
  input: {
    paddingRight: 1,
    marginTop: 10,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  login: {
    backgroundColor: Color.darkslategray_200,
    overflow: "hidden",
    flex: 1,
  },
});

export default Login;
