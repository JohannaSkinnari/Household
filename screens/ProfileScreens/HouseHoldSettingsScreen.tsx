import { useTheme } from "react-native-paper";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EditHouseHoldForm from "../../components/EditHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function HouseholdSettingsScreen({
  navigation,
  route,
}: ProfileStackScreenProps<"HouseholdSettings">) {
  const houseId = route.params.id;

  const households = useAppSelector(s => s.houseHoldList);
  const { colors } = useTheme();
  const toggleSuccess = () => {
    if (households.isCreatedSuccess === true) {
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.formContainer}>
        <Text style={[styles.text, { color: colors.text }]}>
          Ändra hushållets namn:
        </Text>
        <EditHouseHoldForm onSubmitSuccess={toggleSuccess} houseId={houseId} />
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
  text: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
  },
  formContainer: {
    flex: 4,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
