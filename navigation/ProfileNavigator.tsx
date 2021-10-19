import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CreateHouseholdScreen from "../screens/ProfileScreens/CreateHouseHoldScreen";
import HouseholdInfoScreen from "../screens/ProfileScreens/HouseHoldInfoScreen";
import HouseholdSettingsScreen from "../screens/ProfileScreens/HouseHoldSettingsScreen";
import JoinHouseholdScreen from "../screens/ProfileScreens/JoinHouseHoldScreen";
import ProfileScreen from "../screens/ProfileScreens/ProfileScreen";
import HouseholdNavigator from "./HouseHoldNavigator";

type ProfileStackParamList = {
  Profile: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdSettings: undefined;
  Household: undefined;
  HouseholdInfo: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = NativeStackScreenProps<ProfileStackParamList, Screen>;

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator 
      screenOptions={{headerTitleAlign: "center" }}
    >
      <Stack.Group>
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            title: "user.name", 
            headerLeft: () => null
          }}
        />
        <Stack.Screen 
          name="JoinHousehold" 
          component={JoinHouseholdScreen} 
          options={{title: "Gå med i hushåll"}}
        />
        <Stack.Screen 
          name="CreateHousehold" 
          component={CreateHouseholdScreen} 
          options={{title: "Skapa ett hushåll"}}
        />
        <Stack.Screen 
          name="HouseholdSettings" 
          component={HouseholdSettingsScreen} 
          options={{title: "Inställningar"}}
        />
        <Stack.Screen 
          name="Household" 
          component={HouseholdNavigator} 
          options={{
            title: "household.name"/**peta in state/prop här för att visa korrekt hushållsnamn */,
            headerLeft: () => null
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
          name="HouseholdInfo"
          component={HouseholdInfoScreen}
          options={{
            title: "Hushålls.namn", 
            headerLeft: () => null
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}