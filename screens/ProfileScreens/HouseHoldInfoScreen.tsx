import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function HouseholdInfoScreen() {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>Hello from HouseHoldInfoScreen</Text>
    </View>
  );
}
