import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";

export default function MemberScreen() {
  const { colors } = useTheme();
  const [openInvitation, setOpenInvitation] = useState(false);
  return (
    <>
    <View>
      <Text style={{ color: colors.text }}>Hello from MemberScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => setOpenInvitation(true)}>Bjud in</Button>
    </View>
      {openInvitation && (
        <Modal 
          visible={openInvitation}
          onDismiss={() => setOpenInvitation(false)}
        >
          <Text style={{ color: colors.text }}>Exempel Modal som visar household.householdcode.  Click outside this area to dismiss.</Text>
        </Modal>
      )}
      </>
  );
}
