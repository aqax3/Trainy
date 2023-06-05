const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import WorkoutPlanDetail from "./screens/WorkoutPlanDetail";
import Profile from "./screens/Profile";
import Insight from "./screens/Insight";
import VideoPause from "./screens/VideoPause";
import WorkoutCategories from "./screens/WorkoutCategories";
import Language from "./screens/Language";
import Notifications from "./screens/Notifications";
import UnitsOfMeasure from "./screens/UnitsOfMeasure";
import Settings from "./screens/Settings";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import EditProfile from "./screens/EditProfile";
import VideoIcon from "./screens/VideoIcon";
import Splash from "./screens/Splash";
import FrameScreen from "./screens/FrameScreen";
import HomeIcon from "./components/HomeIcon";
import HomeIcon1 from "./components/HomeIcon1";
import GroupComponent2 from "./components/GroupComponent2";
import Insight1 from "./components/Insight1";
import ProfilePictureIcon from "./components/ProfilePictureIcon";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddWorkoutScreen from "./components old/Calendar/addWorkout";

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }: any) {
  const [bottomTabItemsNormal] = React.useState([
    <HomeIcon1 />,
    <Insight1 />,
    <ProfilePictureIcon />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <HomeIcon />,
    <GroupComponent2 />,
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
              height: 92.5,
              backgroundColor: "#1A2D3D",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              maxHeight: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
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
        component={Insight}
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


  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    
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
                name="VideoPause"
                component={VideoPause}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkoutCategories"
                component={WorkoutCategories}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UnitsOfMeasure"
                component={UnitsOfMeasure}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Video"
                component={VideoIcon}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Frame22"
                component={FrameScreen}
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
