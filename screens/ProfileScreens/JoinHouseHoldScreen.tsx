import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import { Button } from "react-native-paper";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function JoinHouseholdScreen({navigation}: ProfileStackScreenProps<"JoinHousehold">) {
  const { colors } = useTheme();
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false);
  return (
    <>
    <View>
      <Text style={{ color: colors.text }}>Hello from JoinHouseholdScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => setOpenAvatarPicker(true)}>Gå med i hushåll/ modal</Button>
      {/* 1 modal för välja avatar */}
    </View>
    {openAvatarPicker && (
      <Modal 
        visible={openAvatarPicker}
        onDismiss={() => setOpenAvatarPicker(false)}
      >
        <Text style={{ color: colors.text }}>Exempel Modal som visar modal där man väljer Avatar.  Click outside this area to dismiss.</Text>
        {/* använd custom component för knapp*/}
        <Button onPress={() => navigation.navigate("Profile")}>Spara/ profil</Button>
      </Modal>
    )}
    </>
  );
}
