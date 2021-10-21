import React from "react";
import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { intervalData } from "../assets/intervalData/intervalData";

interface Props {
  value: number;
  selectPickerIntervalValue: (value: number) => void;
}

export default function IntervalPicker({ selectPickerIntervalValue }: Props) {
  const { colors } = useTheme();
  // function range(start: number, end: number) {
  //   return Array(end - start + 1).fill().map((_, idx) => start + idx)
  // }
  // var intervalNumbers = range(1, 30); // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  // const intervalNumbers: number[] = Array.from(Array(31).keys());
  return (
    <View
      style={[styles.input, styles.interval, {backgroundColor: colors.surface}]}
    >
      <FlatList
        data={intervalData}
        horizontal={true}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => selectPickerIntervalValue(item.value)}
            style={styles.numbers}
          >
            <Text style={[styles.number, {color: colors.text}]}>{item.value}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* <Pressable onPress={() => selectPickerIntervalValue(2)}>
        <Text style={[styles.boldText, {color: colors.onSurface}]}>
          Gå tillbaka 1 2 3 4 5 6
        </Text>
      </Pressable> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    // marginTop: 15,
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
    // fontSize: 18,
    // fontWeight: "bold",
  },
  number: {
    // paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
})