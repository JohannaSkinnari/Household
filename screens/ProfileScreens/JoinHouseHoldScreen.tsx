import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import JoinHouseHoldForm from "../../components/JoinHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import {
  selectHouseholdCodes,
  selectOtherHouseholds,
  selectUserHouseholds,
} from "../../redux/houseHold/houseHoldSelector";

import { useAppSelector } from "../../redux/reduxHooks";

export default function JoinHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"JoinHousehold">) {
  const codes = useAppSelector(selectHouseholdCodes);
  const households = useAppSelector(selectOtherHouseholds);
  const { colors } = useTheme();
  const [error, setError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const one = useAppSelector(state => state.houseHoldList.houseHoldList);
  // console.log("householdlist: ");
  // console.log(one);
  // const two = useAppSelector(state => state.houseHoldList.otherHouseholds);
  // console.log("otherHouseholds: ");
  // console.log(two);

  async function checkCode(code: number) {
    const foundHouseholdCode = codes.some(c => c == code);

    if (!foundHouseholdCode) {
      setError(true);
      setErrorMessage("Hushållet finns inte");
    }
    if (foundHouseholdCode) {
      const foundHouse = households.find(h => h.houseHoldCode == code);
      if (foundHouse === undefined) {
        throw new TypeError("Something that was supposed to be here wasnt");
      }
      setError(false);
      navigation.navigate("HouseholdInfo", { id: foundHouse.id });
    }
  }
  useEffect(() => {
    if (error === true) {
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
