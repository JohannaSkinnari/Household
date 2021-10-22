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
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      <Image
        style={{
          height: 250,
          width: 250,
        }}
        source={require("../../assets/images/Logo.png")}
      />
      <View style={{ justifyContent: "flex-end" }}>
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
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
});

//   <Button onPress={() => navigation.navigate("HouseholdInfo")}>Gå med i hushåll/ avatarmodal</Button>
