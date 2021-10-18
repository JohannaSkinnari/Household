import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChoresScreen from "../screens/HouseholdScreens/ChoresScreen";
import LastWeekStatisticScreen from "../screens/HouseholdScreens/LastWeekStatisticScreen";
import MemberScreen from "../screens/HouseholdScreens/MemberScreen";
import ThisWeekStatisticScreen from "../screens/HouseholdScreens/ThisWeekStatisticScreen";

const Tab = createMaterialTopTabNavigator();

export default function HouseholdNavigator() {
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
