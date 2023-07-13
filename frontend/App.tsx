<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import WorkoutPlanDetail from "./screens/WorkoutPlanDetail";
import WorkoutCategories from "./screens/WorkoutCategories";
import VideoIcon from "./screens/VideoIcon";
import VideoPause from "./screens/VideoPause";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import FrameScreen from "./screens/FrameScreen";
import Insight1 from "./screens/Insight1";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Settings from "./screens/Settings";
import UnitsOfMeasure from "./screens/UnitsOfMeasure";
import Notifications from "./screens/Notifications";
import Language from "./screens/Language";
import Splash from "./screens/Splash";
import HomeIcon1 from "./components/HomeIcon1";
import HomeIcon from "./components/HomeIcon";
import Insight2 from "./components/Insight2";
import Insight from "./components/Insight";
import ProfilePictureIcon from "./components/ProfilePictureIcon";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
=======
=======
>>>>>>> parent of 9998372 (Design)
=======
>>>>>>> parent of 9998372 (Design)
=======
>>>>>>> parent of 9998372 (Design)
=======
>>>>>>> parent of 9998372 (Design)
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import NavigationRegLog from "./components/NavigationRegLog/NavigationRegLog";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 9998372 (Design)

export default function App() {

<<<<<<< HEAD
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }: any) {
  const [bottomTabItemsNormal] = React.useState([
    <HomeIcon />,
    <Insight />,
    <ProfilePictureIcon />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <HomeIcon1 />,
    <Insight2 />,
    <ProfilePictureIcon />,
  ]);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      tabBar={({ state, descriptors, navigation }: any) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              height: 92,
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              maxHeight: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#1a2d3d",
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
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Insight"
        component={Insight1}
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
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const [fontsLoaded, error] = useFonts({
    "Open Sans_regular": require("./assets/fonts/Open_Sans_regular.ttf"),
    "Open Sans_semibold": require("./assets/fonts/Open_Sans_semibold.ttf"),
    "Open Sans_bold": require("./assets/fonts/Open_Sans_bold.ttf"),
    Roboto_regular: require("./assets/fonts/Roboto_regular.ttf"),
    Roboto_bold: require("./assets/fonts/Roboto_bold.ttf"),
    Inter_light: require("./assets/fonts/Inter_light.ttf"),
    Inter_regular: require("./assets/fonts/Inter_regular.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 2000);
  }, []);

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
              <Stack.Screen
                name="WorkoutPlanDetail"
                component={WorkoutPlanDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkoutCategories"
                component={WorkoutCategories}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Video"
                component={VideoIcon}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VideoPause"
                component={VideoPause}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Frame22"
                component={FrameScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UnitsOfMeasure"
                component={UnitsOfMeasure}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Splash />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
export default App;
=======
  return (
    <View style={styles.container}>
      <NavigationRegLog />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
>>>>>>> parent of 9998372 (Design)
=======

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationRegLog />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
>>>>>>> parent of 9998372 (Design)
=======

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationRegLog />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
>>>>>>> parent of 9998372 (Design)
=======

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationRegLog />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
>>>>>>> parent of 9998372 (Design)
=======

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationRegLog />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
>>>>>>> parent of 9998372 (Design)
