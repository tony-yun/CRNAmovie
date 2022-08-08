import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { Black_color, Yellow_color } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: isDark ? Yellow_color : "white",
        tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
        tabBarStyle: {
          backgroundColor: isDark ? Black_color : "white",
        },
        headerStyle: {
          backgroundColor: isDark ? Black_color : "white",
        },
        headerTitleStyle: { color: isDark ? Yellow_color : "white" },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarBadge: "hi",
        }}
      />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
