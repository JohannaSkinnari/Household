import { CompositeScreenProps, useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { HouseholdStackScreenProps } from "../../navigation/HouseholdNavigator";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

type Props = CompositeScreenProps<
  HouseholdStackScreenProps<"Chores">,
  ProfileStackScreenProps<"Profile">
>;

export default function ChoresScreen({navigation}: Props) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>Hello from ChoresScreen</Text>
      <Button onPress={() => navigation.navigate("Profile")}>Household</Button>
    </View>
  );
}
