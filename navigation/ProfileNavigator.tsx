import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProfileScreen from "../screens/ProfileScreens/ProfileScreen";
import JoinHouseholdScreen from "../screens/ProfileScreens/JoinHouseholdScreen";
import CreateHouseholdScreen from "../screens/ProfileScreens/CreateHouseholdScreen";
import HouseholdSettingsScreen from "../screens/ProfileScreens/HouseholdSettingsScreen";
import HouseholdNavigator from "./HouseholdNavigator";

type ProfileStackParamList = {
  Profile: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdSettings: undefined;
  Household: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = NativeStackScreenProps<ProfileStackParamList, Screen>;

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{title: "user.name"}}/>
      <Stack.Screen name="JoinHousehold" component={JoinHouseholdScreen} options={{title: "Gå med i hushåll"}}/>
      <Stack.Screen name="CreateHousehold" component={CreateHouseholdScreen} options={{title: "Skapa ett hushåll"}}/>
      <Stack.Screen name="HouseholdSettings" component={HouseholdSettingsScreen} options={{title: "Inställningar"}}/>
      <Stack.Screen name="Household" component={HouseholdNavigator} />
    </Stack.Navigator>
  );
}