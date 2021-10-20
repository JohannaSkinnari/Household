import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TabBar } from "react-native-tab-view";
import CustomTabBar from "../components/CustomTabBar";
import ChoresScreen from "../screens/HouseHoldScreens/ChoresScreen";
import CurrentWeekStatisticScreen from "../screens/HouseHoldScreens/CurrentWeekStatisticScreen";
import MemberScreen from "../screens/HouseHoldScreens/MemberScreen";
import PreviousWeekStatisticScreen from "../screens/HouseHoldScreens/PreviousWeekStatisticScreen";

export type HouseholdStackParamList = {
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
      tabBar={(props: any) => <CustomTabBar {...props}/>}
    >
      <Tab.Screen 
        name="Chores" 
        component={ChoresScreen}  
        options={{title: "Dagens Sysslor", tabBarItemStyle: {width: "100%"}}}

      />
      <Tab.Screen 
        name="Members" 
        component={MemberScreen} 
        options={{title: "Medlemmar"}}
      />
      <Tab.Screen 
        name="CurrentWeek" 
        component={CurrentWeekStatisticScreen} 
        options={{title: "Veckan"}}
      />
      <Tab.Screen 
        name="PreviousWeek" 
        component={PreviousWeekStatisticScreen} 
        options={{title: "Förra veckan"}}
      />
    </Tab.Navigator>
  );
}
