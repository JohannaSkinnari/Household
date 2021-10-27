import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { IChore } from "../interfaces/IChore";

interface Props {
  chore: IChore;
}

export default function LastCompletedView({ chore }: Props) {
  const { colors } = useTheme();

  if (!chore.lastCompleted) {
    return null;
  }
  const DateLastCompleted = new Date(chore.lastCompleted);
  const today = new Date();
  const DaysSinceLastCompleted: number =
    today.getDate() - DateLastCompleted.getDate();

  return (
    <View
      style={[
        styles.litleCircle,
        {
          backgroundColor:
            DaysSinceLastCompleted >= chore.interval
              ? colors.darkPink
              : colors.valueEight,
          height:
            chore.lastCompleted === undefined || DaysSinceLastCompleted === 0
              ? 0
              : 25,
          width:
            chore.lastCompleted === undefined || DaysSinceLastCompleted === 0
              ? 0
              : 25,
        },
      ]}
    >
      <Text
        style={{
          color:
            DaysSinceLastCompleted >= chore.interval
              ? colors.surface
              : colors.text,
        }}
      >
        {DaysSinceLastCompleted}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  litleCircle: {
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
});
