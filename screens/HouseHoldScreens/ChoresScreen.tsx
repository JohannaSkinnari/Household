import { CompositeScreenProps, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import AdminChoreModal from "../../components/modals/adminChoreModal";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

type Props = CompositeScreenProps<
  HouseholdStackScreenProps<"Chores">,
  ProfileStackScreenProps<"Profile">
>;

export default function ChoresScreen({ navigation }: Props) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openChore, setOpenChore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { colors } = useTheme();

  const chore = {
    id: "1",
    name: "Damsuga",
    householdId: "1",
    description: "Under sängen",
    interval: 3,
    weight: 6,
  };
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
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          visible={openAdd}
          onDismiss={() => setOpenAdd(false)}
        >
          <AdminChoreModal
            onSave={() => setOpenAdd(false)}
            onClose={() => setOpenAdd(false)}
          />
        </Modal>
      )}
      {openChore && (
        <>
          <Modal visible={openChore} onDismiss={() => setOpenChore(false)}>
            <Text style={{ color: colors.text }}>
              Exampel Modal med information för vald syssla. Click outside this
              area to dismiss.
            </Text>
            {/* använd custom component för knapp*/}
            <Button onPress={() => setOpenEdit(true)}>Ändra</Button>
            <Button onPress={() => setOpenChore(false)}>Klar</Button>
            <Button onPress={() => setOpenChore(false)}>Stäng</Button>
          </Modal>
          {openEdit && chore && (
            <>
              <Modal
                contentContainerStyle={{ justifyContent: "center", flex: 1 }}
                visible={openChore}
                onDismiss={() => setOpenEdit(false)}
              >
                <AdminChoreModal
                  onSave={() => setOpenEdit(false)}
                  onClose={() => setOpenEdit(false)}
                  choreId={chore.id}
                />
              </Modal>
              {openDelete && (
                <Modal
                  visible={openChore}
                  onDismiss={() => setOpenDelete(false)}
                >
                  <Text style={{ color: colors.text }}>
                    Exampel Modal för att Tabort vald syssla. Click outside this
                    area to dismiss.
                  </Text>
                  <Button
                    onPress={() => {
                      setOpenDelete(false);
                      setOpenEdit(false);
                      setOpenChore(false);
                    }}
                  >
                    Ta bort
                  </Button>
                  <Button onPress={() => setOpenDelete(false)}>Stäng</Button>
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
