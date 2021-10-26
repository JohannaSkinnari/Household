import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CreateHouseHoldForm from "../../components/CreateHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function CreateHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"CreateHousehold">) {
  const households = useAppSelector(s => s.houseHoldList);
  const toggleSuccess = () => {
    if (households.isCreatedSuccess === true) {
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            height: 250,
            width: 250,
          }}
          source={require("../../assets/images/Logo.png")}
        />
        <View style={styles.formContainer}>
          <CreateHouseHoldForm onSubmitSuccess={toggleSuccess} />
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
  imageContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
