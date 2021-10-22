import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import CustomButton from "../../components/common/CustomButton";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  const { colors } = useTheme();

  function navigateTo(id: string) {
    navigation.navigate("Household", { id });
  }

  return (
    <View style={styles.root}>
      <View
        style={[styles.houseList, { flex: 3, backgroundColor: colors.blue }]}
      >
        <HouseHoldView onSelectedHouse={navigateTo} />
      </View>
      <View
        style={[
          {
            justifyContent: "flex-end",
            flex: 1,
            backgroundColor: colors.brown,
          },
        ]}
      >
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  houseList: {
    justifyContent: "center",
    alignItems: "center",
  },
});

// <Button onPress={() => navigation.navigate("Household")}>
//   Household
// </Button>
// <Button onPress={() => navigation.navigate("HouseholdSettings")}>
//   HouseholdSettings
// </Button>
