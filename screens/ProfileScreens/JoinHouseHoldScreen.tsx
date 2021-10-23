import React from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import JoinHouseHoldForm from "../../components/JoinHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function JoinHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"JoinHousehold">) {
  const { colors } = useTheme();
  // const [openAvatarPicker, setOpenAvatarPicker] = useState(false);
  const households = useAppSelector((state) =>
    state.houseHoldList.houseHoldList.filter((house) => house.houseHoldCode)
  );

  function checkCode(code: number) {
    const householdCode = households.some(
      (house) => house.houseHoldCode == code
    );

    if (!householdCode) {
      return Alert.alert("scheiße auch nichts gefunden");
    }
    if (householdCode) {
      navigation.navigate("HouseholdInfo");
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

//   <Button onPress={() => navigation.navigate("HouseholdInfo")}>Gå med i hushåll/ avatarmodal</Button>
