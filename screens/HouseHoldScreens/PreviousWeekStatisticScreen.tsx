import { useTheme } from "react-native-paper";
import React from "react";
import { Text, View } from "react-native";

export default function PreviousWeekStatisticScreen() {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={{ color: colors.text }}>
        Hello from PreviousWeekStatisticScreen
      </Text>
      <Text style={{ color: colors.text }}>Detta är en VG Sida</Text>
    </View>
  );
}
