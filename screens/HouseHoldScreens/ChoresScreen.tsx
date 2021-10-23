import { CompositeScreenProps, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import AdminChoreModal from "../../components/modals/adminChoreModal";
import { IChore } from "../../interfaces/IChore";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

type Props = CompositeScreenProps<
  HouseholdStackScreenProps<"Chores">,
  ProfileStackScreenProps<"Profile">
>;

export default function ChoresScreen({ navigation, route }: Props) {
  const householdId = route.params.id;
  const [openAdd, setOpenAdd] = useState(false);
  const [openChore, setOpenChore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { colors } = useTheme();

  // provisorisk data för att kunna öppna modalen edit innan vi renderar ut alla sysslor.
  const chore = {
    id: "1",
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
            householdId={householdId}
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
                  onSave={() => {
                    setOpenEdit(false), setOpenChore(false);
                  }}
                  onClose={() => setOpenEdit(false)}
                  choreId={chore.id}
                  householdId={householdId}
                  onRemove={() => setOpenDelete(true)}
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
