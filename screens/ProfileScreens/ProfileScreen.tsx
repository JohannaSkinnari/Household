import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";


export default function ProfileScreen({navigation}: ProfileStackScreenProps<"Profile">) {
  return (
    <View>
      <Text>Hello from ProfileScreen</Text>
      <Button onPress={() => navigation.navigate("JoinHousehold")}>Join Household</Button>
      <Button onPress={() => navigation.navigate("CreateHousehold")}>Create Household</Button>
      <Button onPress={() => navigation.navigate("Household")}>Household</Button>
      <Button onPress={() => navigation.navigate("HouseholdSettings")}>HouseholdSettings</Button>
    </View>
  );
}
