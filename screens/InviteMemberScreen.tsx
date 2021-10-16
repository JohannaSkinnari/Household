import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function InviteMemberScreen() {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>Hello from InviteMemberScreen</Text>
    </View>
  );
}
