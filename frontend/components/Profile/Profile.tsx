import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { ThemeProvider, lightColors, createTheme } from "@rneui/themed";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { Divider } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface IUser {
  username: string;
  height: number;
  weight: number;
}

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: {
        ...lightColors.platform.android,
        primary: "#4e937a",
        secondary: "#92b4f4",
      },
      ios: {
        ...lightColors.platform.ios,
        primary: "#4e937a",
        secondary: "#92b4f4",
      },
    }),
  },
});

export default function ProfileScreen() {
  const [user, setUser] = useState<IUser>({
    username: "",
    height: 0,
    weight: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useFocusEffect(
    useCallback(() => {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      fetchUserInfo();

      return () => {
        // You can add any cleanup logic here if needed
      };
    }, [])
  );

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
      return false;
    }

    if (!/\d/g.test(password)) {
      return false;
    }

    return true;
  };

  const fetchUserInfo = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setToken(userToken);

      const response = await axios.get(`http://192.168.1.106:5001/user-info`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setUser(response.data);
      // Reset the height and weight inputs based on fetched data
      setHeightInput(response.data.height ? String(response.data.height) : "");
      setWeightInput(response.data.weight ? String(response.data.weight) : "");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch user info.");
      setIsLoading(false);
    }
  };

  const updateUserInfo = async () => {
    try {
      if (newPassword && !oldPassword) {
        Alert.alert(
          "Error",
          "Please provide your old password to change to a new one."
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New password and confirm password do not match.");
        return;
      }

      if (newPassword && !validatePassword(newPassword)) {
        Alert.alert(
          "Error",
          "Password must be at least 6 characters, contain 1 number and 1 special character."
        );
        return;
      }

      const payload: any = { ...user };

      if (newPassword) {
        payload.oldPassword = oldPassword;
        payload.password = newPassword;
      }

      const response = await axios.patch(
        `http://192.168.1.106:5001/user-update`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("username", user.username);
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update user info.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setHeightInput(user.height ? String(user.height) : "");
    setWeightInput(user.weight ? String(user.weight) : "");
  }, [user.height, user.weight]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          ...styles.contentContainer,
          paddingBottom: 380,
        }}
      >
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={user.username}
          onChangeText={(text) => setUser({ ...user, username: text })}
          placeholder="Username"
          placeholderTextColor="#92b4f4"
        />

        <Text style={styles.label}>Height (cm/ft):</Text>
        <TextInput
          style={styles.input}
          value={heightInput}
          onChangeText={(text) => {
            setHeightInput(text);
            const parsed = parseFloat(text);
            if (!isNaN(parsed)) {
              setUser((prevUser) => ({ ...prevUser, height: parsed }));
            }
          }}
          placeholder="Height"
          placeholderTextColor="#92b4f4"
        />

        <Text style={styles.label}>Weight (kg/lbs):</Text>
        <TextInput
          style={styles.input}
          value={weightInput}
          onChangeText={(text) => {
            setWeightInput(text);
            const parsed = parseFloat(text);
            if (!isNaN(parsed)) {
              setUser((prevUser) => ({ ...prevUser, weight: parsed }));
            }
          }}
          placeholder="Weight"
          placeholderTextColor="#92b4f4"
        />
        <Button
          title="Apply changes"
          onPress={updateUserInfo}
          color="#4e937a"
        />

        <Divider width={50} color={"transparent"} />
        <Text style={styles.label}>Change password:</Text>
        <Text style={{ color: "#ffefd5", marginTop: 10 }}>Old Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Enter old password"
          placeholderTextColor="#92b4f4"
        />

        <Text style={{ color: "#ffefd5", marginTop: 10 }}>New Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
          placeholderTextColor="#92b4f4"
        />

        <Text style={{ color: "#ffefd5", marginTop: 10 }}>
          Confirm Password:
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor="#92b4f4"
        />

        <Button
          title="Apply changes"
          onPress={updateUserInfo}
          color="#4e937a"
        />
      </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a2d3d",
  },
  contentContainer: {
    justifyContent: "flex-start",
  },
  label: {
    color: "#ffefd5",
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#4e937a",
    borderRadius: 10,
    color: "#e5f4e3",
  },
});
