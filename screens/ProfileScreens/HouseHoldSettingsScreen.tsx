import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../../components/common/CustomButton";
import EditHouseHoldForm from "../../components/EditHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function HouseholdSettingsScreen({
  navigation,
}: ProfileStackScreenProps<"HouseholdSettings">) {
  const households = useAppSelector(s => s.houseHoldList);
  const { colors } = useTheme();
  const toggleSuccess = () => {
    if (households.isCreatedSuccess === true) {
      navigation.navigate("Profile");
    }
  };

  return (
    <View>
      <View>
        {/* <EditHouseHoldForm onSubmitSuccess={toggleSuccess}/>        */}
      </View>
      <Text>
        Knapp för att ändra hushållsnamn och här ser man också requests att gå
        med
      </Text>
    </View>
  );
}
