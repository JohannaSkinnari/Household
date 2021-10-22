import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper";
import JoinHouseHoldForm from "../../components/JoinHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function JoinHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"JoinHousehold">) {
  const { colors } = useTheme();
  // const [openAvatarPicker, setOpenAvatarPicker] = useState(false);
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
        <JoinHouseHoldForm
          onSubmitSuccess={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
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
