import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import JoinHouseHoldForm from "../../components/JoinHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { getHouseholdCodes } from "../../redux/houseHold/houseHoldSelector";
import { useAppSelector } from "../../redux/reduxHooks";

export default function JoinHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"JoinHousehold">) {
  const households = useAppSelector(getHouseholdCodes);

  function checkCode(code: number) {
    const householdCode: boolean = households.some(
      (house) => house.houseHoldCode == code
    );
    const house = households.find((h) => (h.id, h.houseHoldCode == code));

    if (!householdCode) {
      // TODO should be a snackbar instead
      return Alert.alert("Achtung!", "scheiße auch nichts gefunden");
    }
    if (householdCode && house) {
      navigation.navigate("HouseholdInfo", { id: house.id });
    }
  }

  return (
    <View style={[styles.root]}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            height: 250,
            width: 250,
          }}
          source={require("../../assets/images/Logo.png")}
        />
      </View>
      <View style={{ flex: 1 }}>
        <JoinHouseHoldForm onSubmitSuccess={checkCode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
