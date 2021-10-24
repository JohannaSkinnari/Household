import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { useAppSelector } from "../redux/reduxHooks";

interface Props {
  onSelectedChore: (id: string) => void;
  householdId: string;
}

export default function ChoreView({ onSelectedChore, householdId }: Props) {
  const { colors } = useTheme();

  const ChoreList = useAppSelector((state) =>
    state.choresList.chores.filter((chore) => chore.householdId === householdId)
  );

  return (
    <>
      {ChoreList.map((chore) => (
        <View key={chore.id}>
          <TouchableOpacity
            onPress={() => onSelectedChore(chore.id)}
            style={[styles.householdCard, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.text, { color: colors.onSurface }]}>
              {chore.name}
            </Text>
            <View style={styles.iconsContainer}>
              <Image style={styles.avatar} source={require("../")}></Image>
              <Image style={styles.avatar} source={require("../")}></Image>
              <Image style={styles.avatar} source={require("../")}></Image>
              <View style={styles.days}></View>
            </View>
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
    paddingHorizontal: 10,
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
  text: {
    fontWeight: "500",
    fontSize: 18,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  days: {
    height: 30,
    width: 30,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
