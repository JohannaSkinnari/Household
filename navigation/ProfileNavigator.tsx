import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useAppSelector } from "../redux/reduxHooks";
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
  HouseholdSettings: { id: string };
  Household: { id: string };
  HouseholdInfo: { id: string };
  Login: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = NativeStackScreenProps<ProfileStackParamList, Screen>;

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigation() {
  const user = useAppSelector(u => u.userList.activeUser);
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Group>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={() => ({
            header: () => {
              const userName = user?.displayName;
              const { colors } = useTheme();
              return (
                <View style={styles.header}>
                  <FontAwesome name="user-circle-o" size={27} color="#c75267" />
                  <Text style={[styles.headerText, { color: colors.text }]}>
                    {userName}
                  </Text>
                </View>
              );
            },
            headerLeft: () => null,
          })}
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
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  userNameContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  headerText: {
    fontSize: 20,
    marginHorizontal: 10,
  },

  logo: {
    height: 30,
    width: 30,
  },
});
