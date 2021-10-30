import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { selectUserHouseholds } from "../redux/houseHold/houseHoldSelector";
import { useAppSelector } from "../redux/reduxHooks";



interface Props {
  onSelectedHouse: (id: string) => void;
  onSelectedHouseSetup: (id: string) => void;
}

export default function HouseHoldView({ onSelectedHouse,onSelectedHouseSetup }: Props) {
  const { colors } = useTheme();

  const houseList = useAppSelector(selectUserHouseholds);

  
  return (
    <>
      {houseList.map(({ house, member, avatar }) => (
        <View key={house.id}>
          <TouchableOpacity
            onPress={() => onSelectedHouse(house.id)}
            style={[styles.householdCard, { backgroundColor: colors.surface }]}
          >
            <Text
              style={{
                color: colors.onSurface,
                fontWeight: "500",
                fontSize: 18,
              }}
            >
              {house.name}
            </Text>
            <View style={styles.iconsContainer}>
              <Image
                style={[styles.crown, { height: member?.isAdmin ? 30 : 0 }]}
                source={require("../assets/images/crown.png")}
              />
              <Image style={styles.avatar} source={avatar?.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => onSelectedHouseSetup("HouseholdSettings")} 
          
          style={[styles.buttonStyle, { backgroundColor: colors.surface},{ display: member?.isAdmin ? "flex" : "none" }]}
          activeOpacity={0.5}
        >
          <View style={styles.buttonIconStyle}>
          <SimpleLineIcons name="settings" size={18} color="#c75267" />
          </View>
          
          <Text style={[{ color: colors.text}]}>Inställningar</Text>
        </TouchableOpacity>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  householdCard: {
    margin: 10,
    height: 60,
    width: 330,
    borderRadius: 12,
    paddingLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  crown: {
    width: 30,
    marginRight: 8,
    alignItems: "center",
  },
  iconsContainer: {
    marginRight: 8,
    flexDirection: "row",
  },

  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#485a96",
    height: 25,
    marginHorizontal:10,
    borderRadius: 15,
    marginBottom: 10,
    width:120,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonIconStyle: {
    padding: 8,
  },
});
