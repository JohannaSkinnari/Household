import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AvatarList from "../../components/AvatarList";
import CreateHouseHoldForm from "../../components/CreateHouseHoldForm";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function CreateHouseholdScreen({
  navigation,
}: ProfileStackScreenProps<"CreateHousehold">) {
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <Text style={{ color: colors.text }}>
        Hello from CreateHouseHoldScreen
      </Text>

      <View style={styles.imageContainer}>
        <Image
          style={{ height: 250, width: 250 }}
          source={require("../../assets/images/Logo.png")}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <CreateHouseHoldForm />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <AvatarList />
        </View>
      </View>
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("Profile")}>
        Spara / profil
      </Button>
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
  },
});
