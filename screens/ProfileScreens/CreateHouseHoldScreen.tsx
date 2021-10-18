import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function CreateHouseholdScreen({navigation}: ProfileStackScreenProps<"CreateHousehold">) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>
        Hello from CreateHouseHoldScreen
      </Text>
      <Button onPress={() => navigation.navigate("Profile")}>Spara / profil</Button>
    </View>
  );
}
