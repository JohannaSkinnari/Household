import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import CustomButton from "../../components/common/CustomButton";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  function navigateTo(id: string) {
    navigation.navigate("Household", { id });
  }

  return (
    <View style={styles.root}>
      <View style={styles.houseList}>
        <HouseHoldView onSelectedHouse={navigateTo} />
      </View>
      <View style={styles.buttons}>
        <CustomButton
          onPress={() => navigation.navigate("JoinHousehold")}
          title={"Gå med i Hushåll"}
        />
        <CustomButton
          onPress={() => navigation.navigate("CreateHousehold")}
          title={"Skapa Hushåll"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
  },
  houseList: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// <Button onPress={() => navigation.navigate("Household")}>
//   Household
// </Button>
// <Button onPress={() => navigation.navigate("HouseholdSettings")}>
//   HouseholdSettings
// </Button>
