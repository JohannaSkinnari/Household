import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import CustomTabBar from "../components/CustomTabBar";
import ChoresScreen from "../screens/HouseHoldScreens/ChoresScreen";
import CurrentMonthStatisticScreen from "../screens/HouseHoldScreens/CurrentMonthStatisticScreen";
import CurrentWeekStatisticScreen from "../screens/HouseHoldScreens/CurrentWeekStatisticScreen";
import MemberScreen from "../screens/HouseHoldScreens/MemberScreen";
import PreviousMonthStatisticScreen from "../screens/HouseHoldScreens/PreviousMonthStatisticScreen";
import PreviousWeekStatisticScreen from "../screens/HouseHoldScreens/PreviousWeekStatisticScreen";
import { ProfileStackScreenProps } from "./ProfileNavigator";

export type HouseholdStackParamList = {
  idag: { id: string };
  medlemmar: { id: string };
  veckan: { id: string };
  ["förra veckan"]: { id: string };
  ["denna månaden"]: { id: string };
  ["förra månaden"]: { id: string };
};

export type HouseholdStackScreenProps<
  Screen extends keyof HouseholdStackParamList
> = NativeStackScreenProps<HouseholdStackParamList, Screen>;

const Tab = createMaterialTopTabNavigator<HouseholdStackParamList>();

export default function HouseholdNavigator({
  route,
}: ProfileStackScreenProps<"Household">) {
  return (
    <Tab.Navigator
      initialRouteName="idag"
      tabBar={(props: any) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="idag"
        initialParams={route.params}
        component={ChoresScreen}
        options={{ title: "Dagens Sysslor" }}
      />
      <Tab.Screen
        name="medlemmar"
        initialParams={route.params}
        component={MemberScreen}
        options={{ title: "Medlemmar" }}
      />
      <Tab.Screen
        name="veckan"
        initialParams={route.params}
        component={CurrentWeekStatisticScreen}
        options={{ title: "Veckan" }}
      />
      <Tab.Screen
        name="förra veckan"
        initialParams={route.params}
        component={PreviousWeekStatisticScreen}
        options={{ title: "Förra veckan" }}
      />
      <Tab.Screen
        name="denna månaden"
        initialParams={route.params}
        component={CurrentMonthStatisticScreen}
        options={{ title: "Denna månaden" }}
      />
      <Tab.Screen
        name="förra månaden"
        initialParams={route.params}
        component={PreviousMonthStatisticScreen}
        options={{ title: "Förra månaden" }}
      />
    </Tab.Navigator>
  );
}
