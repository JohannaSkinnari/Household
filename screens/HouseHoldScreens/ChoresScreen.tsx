import { CompositeScreenProps, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Modal } from "react-native-paper";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

type Props = CompositeScreenProps<
  HouseholdStackScreenProps<"Chores">,
  ProfileStackScreenProps<"Profile">
>;

export default function ChoresScreen({navigation}: Props) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openChore, setOpenChore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { colors } = useTheme();
  
  return (
    <>
      <View>
        <Text style={{ color: colors.text }}>Hello from ChoresScreen</Text>
        {/* använd custom component för knapp*/}
        <Button onPress={() => navigation.navigate("Profile")}>Profil</Button>

        {/* 2 modaler, skapa ny syssla och visa information för vald syssla */}
          {/* provisorisk knapp istället för syssla */}
        <Button onPress={() => setOpenChore(true)}>Provisorisk syssla</Button>
        {/* använd custom component för knapp*/}
        <Button onPress={() => setOpenAdd(true)}>Lägg till Syssla</Button>
      </View>
      {openAdd && (
        <Modal 
          visible={openAdd}
          onDismiss={() => setOpenAdd(false)}
        >
          <Text style={{ color: colors.text }}>Exampel Modal för lägga till syssla.  Click outside this area to dismiss.</Text>
          
        </Modal>
      )}
      {openChore && (
        <>
        <Modal 
          visible={openChore}
          onDismiss={() => setOpenChore(false)}
        >
          <Text style={{ color: colors.text }}>Exampel Modal med information för vald syssla.  Click outside this area to dismiss.</Text>
          {/* använd custom component för knapp*/}
          <Button onPress={() => setOpenEdit(true)}>Ändra</Button>
        </Modal>
        {openEdit && (
          <Modal 
            visible={openChore}
            onDismiss={() => setOpenEdit(false)}
          >
            <Text style={{ color: colors.text }}>Exampel Modal för att ädra på vald syssla.  Click outside this area to dismiss.</Text>
          </Modal>
        )}
        </>
      )}
    </>
  );
}
