import { useTheme } from "react-native-paper";
import React from "react";
import { Text, View } from "react-native";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function HouseholdSettingsScreen({
  navigation,
}: ProfileStackScreenProps<"HouseholdSettings">) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>
        Hello from HouseHoldSettingsScreen
      </Text>
    </View>
  );
}
