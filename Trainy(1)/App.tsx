const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Calendar from "./screens/Calendar";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import Stats from "./screens/Stats";
import Play from "./screens/Play";
import HomeIcon1 from "./components/HomeIcon1";
import HomeIcon from "./components/Home";
import CalendarIcon1 from "./components/Calendar";
import CalendarIcon from "./components/CalendarIcon";
import PlayIcon1 from "./components/Play1";
import PlayIcon from "./components/Play";
import StatsIcon1 from "./components/Stats1";
import StatsIcon from "./components/Stats";
import ProfileIcon1 from "./components/Profile1";
import ProfileIcon from "./components/Profile";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }: any) {
  const [bottomTabItemsNormal] = React.useState([
    <HomeIcon />,
    <CalendarIcon />,
    <PlayIcon />,
    <StatsIcon />,
    <ProfileIcon />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <HomeIcon1 />,
    <CalendarIcon1 />,
    <PlayIcon1 />,
    <StatsIcon1 />,
    <ProfileIcon1 />,
  ]);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }: any) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              borderStyle: "solid",
              borderColor: "rgba(255, 255, 255, 0.6)",
              borderWidth: 1,
              width: 430,
              height: 59,
              overflow: "hidden",
              flexDirection: "row",
            }}
          >
            {bottomTabItemsNormal.map((item: any, index: any) => {
              const isFocused = state.index === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate({
                      name: state.routes[index].name,
                      merge: true,
                    });
                  }}
                >
                  {activeIndex === index
                    ? bottomTabItemsActive[index] || item
                    : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Play"
        component={Play}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    Roboto_regular: require("./assets/fonts/Roboto_regular.ttf"),
    Inter_regular: require("./assets/fonts/Inter_regular.ttf"),
    Inter_semibold: require("./assets/fonts/Inter_semibold.ttf"),
    Inter_bold: require("./assets/fonts/Inter_bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
            
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
