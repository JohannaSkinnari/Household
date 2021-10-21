import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  function navigateTo() {}

  return (
    <View>
      <Text>Hello from ProfileScreen</Text>
      {/* använd custom component för knapp*/}
      <HouseHoldView onSelectedHouse={navigateTo} />
      <Button onPress={() => navigation.navigate("JoinHousehold")}>
        Join Household
      </Button>
      <Button onPress={() => navigation.navigate("CreateHousehold")}>
        Create Household
      </Button>
      <Button onPress={() => navigation.navigate("Household")}>
        Household
      </Button>
      <Button onPress={() => navigation.navigate("HouseholdSettings")}>
        HouseholdSettings
      </Button>
    </View>
  );
}
