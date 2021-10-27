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
  const dateLastCompleted = new Date(chore.lastCompleted);
  const today = new Date();
  const daysSinceLastCompleted: number =
    today.getDate() - dateLastCompleted.getDate();

  return (
    <View
      style={[
        styles.litleCircle,
        {
          backgroundColor:
            daysSinceLastCompleted >= chore.interval
              ? colors.darkPink
              : colors.valueEight,
          height:
            chore.lastCompleted === undefined || daysSinceLastCompleted === 0
              ? 0
              : 25,
          width:
            chore.lastCompleted === undefined || daysSinceLastCompleted === 0
              ? 0
              : 25,
        },
      ]}
    >
      <Text
        style={{
          color:
            daysSinceLastCompleted >= chore.interval
              ? colors.surface
              : colors.text,
        }}
      >
        {daysSinceLastCompleted}
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
