import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function SignupScreen() {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>Hello from SignupScreen</Text>
    </View>
  );
}
