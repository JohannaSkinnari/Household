import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import React, { useState } from "react";
import { Switch,StyleSheet,View,Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useTheme } from "react-native-paper";
import { useAppDispatch } from "../redux/reduxStore";
import CreateHouseholdScreen from "../screens/ProfileScreens/CreateHouseHoldScreen";
import HouseholdInfoScreen from "../screens/ProfileScreens/HouseHoldInfoScreen";
import HouseholdSettingsScreen from "../screens/ProfileScreens/HouseHoldSettingsScreen";
import JoinHouseholdScreen from "../screens/ProfileScreens/JoinHouseHoldScreen";
import ProfileScreen from "../screens/ProfileScreens/ProfileScreen";
import HouseholdNavigator from "./HouseHoldNavigator";
import { useAppSelector } from "../redux/reduxHooks";


type ProfileStackParamList = {
  Profile: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdSettings: undefined;
  Household: { id: string };
  HouseholdInfo: { id: string };
  Login: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = NativeStackScreenProps<ProfileStackParamList, Screen>;

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigation() {
  const user = firebase.auth().currentUser;
  const userName = user?.displayName;
  const { colors } = useTheme();

// const state = store.getState();
// const isEnabledStateValue = initialState.isSetupEnabled;
// console.log(isEnabledStateValue)
const dispatch = useAppDispatch();

const currentTheme = useAppSelector(state=>state.DarkMode)


  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Group>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profil sidan", // userName istället
            headerLeft: () => null,
            headerRight: ()=> (
                <TouchableOpacity
                    onPress={()=>dispatch({type:"change_theme",payload:!currentTheme})}
                    style={styles.toggleDarkLightContainer}
                    activeOpacity={0.5}>
                    <Text style={[styles.toggleSwitchText, { color: colors.darkPink }]}> Dark/Light</Text>
                    <MaterialCommunityIcons name="theme-light-dark" size={25} color="black"  style={[styles.buttonIconStyle, { color: colors.text }]} />
                </TouchableOpacity>
            ) ,
          }}
        />
        <Stack.Screen
          name="JoinHousehold"
          component={JoinHouseholdScreen}
          options={{ title: "Gå med i hushåll" }}
        />
        <Stack.Screen
          name="CreateHousehold"
          component={CreateHouseholdScreen}
          options={{ title: "Skapa ett hushåll" }}
        />
        <Stack.Screen
          name="HouseholdSettings"
          component={HouseholdSettingsScreen}
          options={{ title: "Inställningar" }}
        />
        <Stack.Screen
          name="Household"
          component={HouseholdNavigator}
          options={{
            title:
              "Sysslor" /** peta in state/prop här för att visa korrekt hushållsnamn */,
            headerLeft: () => null,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="HouseholdInfo"
          component={HouseholdInfoScreen}
          options={{
            title: "Hushålls.namn",
            headerLeft: () => null,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#c75267",
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: { width: 3, height: 3 },
    justifyContent: "space-between",
  },

  userNameContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  headerText: {
    textTransform: "uppercase",
    fontSize: 18,
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 35,
    borderRadius: 20,
    margin: 5,
    justifyContent: "space-evenly",
  },
  buttonIconStyle: {
    padding: 8,
    marginRight:5,
  },
  buttonTextStyle: {
    color: "#fff",
    marginHorizontal: 5,
  },

  root: {
    flex: 1,
  },
  houseList: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  
  toggleDarkLightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    justifyContent: "space-evenly",
  },

  toggleSwitchText: {
    fontSize:12,
    fontWeight: "700",
  },
});

