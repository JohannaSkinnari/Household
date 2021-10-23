import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import AvatarList from "../../components/AvatarList";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function HouseholdInfoScreen({
  navigation,
  route,
}: ProfileStackScreenProps<"HouseholdInfo">) {
  const houseId = route.params.id;
  console.log(houseId);
  const { colors } = useTheme();

  return (
    <View style={[styles.root]}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.blue,
        }}
      >
        <Text
          style={{ fontSize: 24, fontWeight: "bold", color: colors.onSurface }}
        >
          Välj din avatar
        </Text>
        <Text style={{ color: colors.onSurface }}>
          (Tillgängliga avatarer i hushållet)
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: colors.green,
        }}
      >
        <AvatarList
          value={0}
          onChange={function (id: string): void {
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
  },
});

// navigation.navigate("Profile")
