import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChoresScreen from "../screens/HouseHoldScreens/ChoresScreen";
import LastWeekStatisticScreen from "../screens/HouseHoldScreens/LastWeekStatisticScreen";
import MemberScreen from "../screens/HouseHoldScreens/MemberScreen";
import ThisWeekStatisticScreen from "../screens/HouseHoldScreens/ThisWeekStatisticScreen";

const Tab = createMaterialTopTabNavigator();

export default function HouseHoldNavigator() {
  return (
    <Tab.Navigator
      // screenOptions={{ tabBarShowLabel: false }}
      initialRouteName="Chores"
    >
      <Tab.Screen name="Chores" component={ChoresScreen} />
      <Tab.Screen name="Members" component={MemberScreen} />
      <Tab.Screen name="ThisW" component={ThisWeekStatisticScreen} />
      <Tab.Screen name="LastW" component={LastWeekStatisticScreen} />
    </Tab.Navigator>
  );
}
