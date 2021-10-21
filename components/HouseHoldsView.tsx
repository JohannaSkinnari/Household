import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppSelector } from "../redux/reduxHooks";

interface Props {
  onSelectedHouse: () => void;
}

export default function HouseHoldView({ onSelectedHouse }: Props) {
  const houseList = useAppSelector((state) =>
    state.houseHoldList.houseHoldList.map((house) => house)
  );
  return (
    <>
      {houseList.map((house) => (
        <Pressable key={house.id} style={[styles.input, styles.textInput]}>
          <Text>{house.name}</Text>
        </Pressable>
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
