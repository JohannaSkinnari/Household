import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import { Button } from "react-native-paper";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function JoinHouseholdScreen({navigation}: ProfileStackScreenProps<"JoinHousehold">) {
  const { colors } = useTheme();
  // const [openAvatarPicker, setOpenAvatarPicker] = useState(false);
  return (
    <View>
      <Text style={{ color: colors.text }}>Hello from JoinHouseholdScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("HouseholdInfo")}>Gå med i hushåll/ avatarmodal</Button>
    </View>
  );
}
