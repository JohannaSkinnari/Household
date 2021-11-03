import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileNavigator from "./ProfileNavigator";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import SignupScreen from "../screens/AuthScreens/SignupScreen";
import IntroScreen from "../screens/Intro/IntroScreen";

type RootStackParamList = {
  Intro: undefined;
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
    initialRouteName="Login" // initial screen
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="ProfileNav" component={ProfileNavigator} />
    </Stack.Navigator>
  );
}
