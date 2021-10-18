import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

export default function CurrentWeekStatisticScreen() {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>
        Hello from CurrentWeekStatisticScreen
      </Text>
    </View>
  );
}
