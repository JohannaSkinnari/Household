import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileNavigator from "./ProfileNavigator";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import SignupScreen from "../screens/AuthScreens/SignupScreen";
import SplashScreen from "../screens/SplashScreens/SplashScreen";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ProfileNav: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator
    initialRouteName="Splash" // initial screen
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="ProfileNav" component={ProfileNavigator} />
    </Stack.Navigator>
  );
}
