import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, TouchableHighlight } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { useIsFocused } from "@react-navigation/native";

import CookieManager from "@react-native-cookies/cookies";

import { useLayoutEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { Header } from "@rneui/base";

type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Home: { username: string };
  MyWorkoutScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation?: HomeScreenNavigationProp;
  route?: { params: { username: string } };
};

export default function HomePage({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [recommendedDifficulty, setRecommendedDifficulty] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }

        const userToken = await AsyncStorage.getItem("userToken");
        const response = await axios.get(
          "http://192.168.1.106:5001/recommendations",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setRecommendedDifficulty(response.data.recommendedDifficulty);
        if (
          response.data.recommendedDifficulty !== "beginner" &&
          response.data.recommendedDifficulty !== "none"
        ) {
          setModalVisible(true);
        }
      })();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text>Welcome {username}</Text>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Consider trying a {recommendedDifficulty} workout!
            </Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 50,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
