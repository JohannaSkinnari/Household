import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import JoinHouseHoldForm from "../../components/JoinHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import {
  getHouseholdCodes,
  getUserHouseholds,
} from "../../redux/houseHold/houseHoldSelector";
import { useAppSelector } from "../../redux/reduxHooks";

export default function JoinHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"JoinHousehold">) {
  const households = useAppSelector(getHouseholdCodes);
  const userHouseHolds = useAppSelector(getUserHouseholds);
  const { colors } = useTheme();
  const [error, setError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function checkCode(code: number) {
    const householdCode: boolean = households.some(
      (house) => house.houseHoldCode == code
    );
    const foundHouse = households.find((h) => (h.id, h.houseHoldCode == code));
    const alreadyMember = userHouseHolds.some(
      (h) => h.member?.householdId == foundHouse?.id
    );

    if (!householdCode) {
      setError(true);
      setErrorMessage("Hushållet finns inte");
    }
    if (alreadyMember) {
      setError(true);
      setErrorMessage("Du är redan medlem i hushållet");
    }
    if (!alreadyMember && householdCode && foundHouse) {
      setError(false);
      navigation.navigate("HouseholdInfo", { id: foundHouse.id });
    }
  }
  useEffect(() => {
    if (error == true) {
      setShowSnackbar(true);
      setError(!error);
    }
  }, [checkCode]);

  function onDismissSnackBar() {
    setShowSnackbar(false);
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
        <View>
          <Snackbar
            style={{
              backgroundColor: colors.darkPink,
            }}
            visible={showSnackbar}
            duration={3000}
            onDismiss={onDismissSnackBar}
            action={{
              icon: "close-circle-outline",
              label: "stäng",
              onPress: () => setShowSnackbar(false),
            }}
          >
            <Text>{errorMessage}</Text>
          </Snackbar>
        </View>
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
