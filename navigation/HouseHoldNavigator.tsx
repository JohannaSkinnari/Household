import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChoresScreen from "../screens/HouseholdScreens/ChoresScreen";
import MemberScreen from "../screens/HouseholdScreens/MemberScreen";
import CurrentWeekStatisticScreen from "../screens/HouseholdScreens/CurrentWeekStatisticScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PreviousWeekStatisticScreen from "../screens/HouseholdScreens/PreviousWeekStatisticScreen";
import { ProfileStackScreenProps } from "./ProfileNavigator";

type HouseholdStackParamList = {
  // Om navigationsproblem uppstår utforska nedan utkommenterad Chores
  // Chores: ProfileStackScreenProps<"Profile">;
  Chores: undefined;
  Members: undefined;
  CurrentWeek: undefined;
  PreviousWeek: undefined;
};

export type HouseholdStackScreenProps<
  Screen extends keyof HouseholdStackParamList
> = NativeStackScreenProps<HouseholdStackParamList, Screen>;

const Tab = createMaterialTopTabNavigator<HouseholdStackParamList>();

export default function HouseholdNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Chores"
    >
      <Tab.Screen name="Chores" component={ChoresScreen}  options={{title: "Dagens Sysslor"}}/>
      <Tab.Screen name="Members" component={MemberScreen} options={{title: "Medlemmar"}}/>
      <Tab.Screen name="CurrentWeek" component={CurrentWeekStatisticScreen} options={{title: "Veckan"}}/>
      <Tab.Screen name="PreviousWeek" component={PreviousWeekStatisticScreen} options={{title: "Förra veckan"}}/>
    </Tab.Navigator>
  );
}
