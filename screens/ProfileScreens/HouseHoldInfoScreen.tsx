import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function HouseholdInfoScreen({navigation}: ProfileStackScreenProps<"HouseholdInfo">) {
  const { colors } = useTheme();
  return (
    <View >
      <Text style={{ color: colors.text }}>Hello from HouseHoldInfoScreen</Text>
      <Button color={colors.text} onPress={() => navigation.navigate("Profile")}>Spara/ kommer till profil</Button>
    </View>
  );
}
