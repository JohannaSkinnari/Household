import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignupScreen from "../screens/AuthScreens/SignupScreen";
import ProfileNavigator from "./ProfileNavigator";

type RootStackParamList = {
  SignIn: undefined;
  ProfileNav: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignupScreen} 
      />
      <Stack.Screen 
        name="ProfileNav" 
        component={ProfileNavigator} 
      />
    </Stack.Navigator>
  );
}
