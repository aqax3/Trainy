import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Text, TextInput, Button, Alert } from "react-native";

interface IUser {
  username: string;
  height: number;
  weight: number;
}

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

  const fetchUserInfo = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setToken(userToken);

      const response = await axios.get(`http://localhost:5001/user-info`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch user info.");
      setIsLoading(false);
    }
  };

  const updateUserInfo = async () => {
    try {
      await axios.patch(`http://localhost:5001/user-update`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.setItem('username', user.username);

      Alert.alert("Success", "User updated successfully");
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
    <View style={{ padding: 20 }}>
      <Text>Username:</Text>
      <TextInput
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
      />

      <Text>Height (cm/ft):</Text>
      <TextInput
        value={heightInput}
        onChangeText={(text) => {
          setHeightInput(text); // Update the input value immediately

          const parsed = parseFloat(text);
          if (!isNaN(parsed)) {
            setUser((prevUser) => ({ ...prevUser, height: parsed }));
          }
        }}
      />

      <Text>Weight (kg/lbs):</Text>
      <TextInput
        value={weightInput}
        onChangeText={(text) => {
          setWeightInput(text); // Update the input value immediately

          const parsed = parseFloat(text);
          if (!isNaN(parsed)) {
            setUser((prevUser) => ({ ...prevUser, weight: parsed }));
          }
        }}
      />

      <Button title="Apply changes" onPress={updateUserInfo} />
    </View>
  );
}
