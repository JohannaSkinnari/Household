import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreens/ProfileScreen";
import HouseHoldNavigator from "./HouseHoldNavigator";

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen name="Sysslor" component={HouseHoldNavigator} />
    </Stack.Navigator>
  );
}
