import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function JoinHouseholdScreen({navigation}: ProfileStackScreenProps<"JoinHousehold">) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>Hello from JoinHouseholdScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("Profile")}>Gå med i hushåll/ profil</Button>
    </View>
  );
}
