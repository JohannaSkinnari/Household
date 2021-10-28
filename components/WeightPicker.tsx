import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  selectPickerWeightValue: (value: number) => void;
}

export default function WeightPicker({ selectPickerWeightValue }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.input, styles.value, { backgroundColor: colors.surface }]}
    >
      <View style={[styles.valueContainer]}>
        <View style={[styles.valueInnerContainer]}>
          <Pressable
            style={[
              styles.valueCircle,
              styles.marginRight5,
              { backgroundColor: colors.valueOne },
            ]}
            onPress={() => selectPickerWeightValue(1)}
          >
            <Text style={[{ color: colors.text }]}>1</Text>
          </Pressable>
        </View>
        <View style={[styles.valueInnerContainer]}>
          <Pressable
            style={[
              styles.valueCircle,
              styles.marginRight5,
              { backgroundColor: colors.valueTwo },
            ]}
            onPress={() => selectPickerWeightValue(2)}
          >
            <Text style={[{ color: colors.text }]}>2</Text>
          </Pressable>
        </View>
        <View style={[styles.valueInnerContainer]}>
          <Pressable
            style={[
              styles.valueCircle,
              styles.marginRight5,
              { backgroundColor: colors.valueFour },
            ]}
            onPress={() => selectPickerWeightValue(4)}
          >
            <Text style={[{ color: colors.text }]}>4</Text>
          </Pressable>
        </View>
        <View style={[styles.valueInnerContainer]}>
          <Pressable
            style={[
              styles.valueCircle,
              styles.marginRight5,
              { backgroundColor: colors.valueSix },
            ]}
            onPress={() => selectPickerWeightValue(6)}
          >
            <Text style={[{ color: colors.text }]}>6</Text>
          </Pressable>
        </View>
        <View style={styles.valueLastInnerContainer}>
          <Pressable
            style={[styles.valueCircle, { backgroundColor: colors.valueEight }]}
            onPress={() => selectPickerWeightValue(8)}
          >
            <Text style={[{ color: colors.text }]}>8</Text>
          </Pressable>
        </View>
      </View>
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
  value: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  valueContainer: {
    // borderLeftWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    // borderRightColor: "red",
    // borderRightWidth: 0.5,
    padding: 0,
    height: "100%",
  },
  valueInnerContainer: {
    // borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  valueLastInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  valueCircle: {
    borderRadius: 50,
    width: 48,
    height: 48,
    // backgroundColor: colors.disabled,
    justifyContent: "center",
    alignItems: "center",
  },
  marginRight5: {
    marginRight: 5,
  },
});
