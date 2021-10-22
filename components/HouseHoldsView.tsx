import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { useAppSelector } from "../redux/reduxHooks";
import { avatars } from "../assets/AvatarData/data";
import { IHouseHold } from "../interfaces/IHouseHold";
import { IMember } from "../interfaces/IMember";
import { selectedhouseholdlist } from "../redux/houseHold/houseHoldSelector";

interface Props {
  onSelectedHouse: (id: string) => void;
}

export default function HouseHoldView({ onSelectedHouse }: Props) {
  const { colors } = useTheme();

  const houseList = useAppSelector(selectedhouseholdlist);

  return (
    <>
      {houseList.map(({ house, avatar }) => (
        <View
          key={house.id}
          style={{
            backgroundColor: colors.green,
          }}
        >
          <TouchableOpacity
            onPress={() => onSelectedHouse(house.id)}
            style={{
              backgroundColor: colors.surface,
              margin: 10,
              height: 60,
              width: 250,
              borderRadius: 12,
              paddingLeft: 5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: 18 }}>
              {house.name}
            </Text>
            <Image style={{ height: 40, width: 40 }} source={avatar?.icon} />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({});
