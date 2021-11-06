import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { intervalData } from "../assets/intervalData/intervalData";

interface Props {
  selectPickerIntervalValue: (value: number) => void;
}

export default function IntervalPicker({ selectPickerIntervalValue }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.input,
        styles.interval,
        { backgroundColor: colors.surface },
      ]}
    >
      <FlatList
        data={intervalData}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            onPress={() => selectPickerIntervalValue(item.value)}
            style={styles.numbers}
          >
            <Text style={[styles.number, { color: colors.text }]}>
              {item.value}
            </Text>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 0,
    fontSize: 18,
    borderRadius: 10,
    paddingHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  interval: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  numbers: {
    paddingHorizontal: 8,
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
