import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "../redux/reduxHooks";

interface Props {
  onSelectedHouse: (id: string) => void;
}

export default function HouseHoldView({ onSelectedHouse }: Props) {
  const houseList = useAppSelector((state) =>
    state.houseHoldList.houseHoldList.map((house) => house)
  );
  return (
    <>
      {houseList.map((house) => (
        <TouchableOpacity
          onPress={() => onSelectedHouse(house.id)}
          key={house.id}
          style={[styles.input, styles.textInput]}
        >
          <Text>{house.name}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 15,
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
    width: 200,
  },
  textInput: {
    textAlign: "center",
    height: 55,
  },
});
